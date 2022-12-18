const methods = {
  // delete everything
  //
  async eraseDatabase() {
    localStorage.removeItem('friends')
    localStorage.removeItem('dms')
    localStorage.removeItem('relays')
    eventsSaved = []
    return
  },

  // general function for saving an event, with granular logic for each kind
  //
  async dbSave(event) {
    switch (event.kind) {
      case 0: {
        // first check if we don't have a newer metadata for this user
        let current = await methods.dbGetProfile(event.pubkey)
        if (current && current.created_at >= event.created_at) {
          // don't save
          return
        }
        break
      }
      case 1:
        break
      case 2:
        break
      case 3:
        break
      case 4:
        break
    }

    event._id = event.id
    
    for (let i = 0; i < eventsSaved.length; i++) { 
      if(event._id == eventsSaved[i]._id){
        return
      }
    }
    eventsSaved.push(JSON.stringify(event))
  },

  // db queries
  // ~
  async dbGetHomeFeedNotes() {
    eventsSaved.map(r => r.doc)
  },

  onNewHomeFeedNote(callback = () => {}) {
    let changes = doc
    changes.on('change', change => callback(change.doc))
    return changes
  },

  async dbGetChats(ourPubKey) {
    let result = JSON.parse(localStorage.getItem('dms'))

    let chats = result
      .map(r => r.key)
      .reduce((acc, [peer, date]) => {
        acc[peer] = acc[peer] || 0
        if (date > acc[peer]) acc[peer] = date
        return acc
      }, {})

    delete chats[ourPubKey]

    return Object.entries(chats)
      .sort((a, b) => b[1] - a[1])
      .map(([peer, lastMessage]) => ({peer, lastMessage}))
  },

  async dbGetMessages(
    peerPubKey,
    limit = 50,
    since = Math.round(Date.now() / 1000)
  ) {
    let chats = JSON.parse(localStorage.getItem('dms'))
    let chat
    for (let i = 0; i < chats.length; i++) { 
      if(chats[i].peerKey == peerPubKey){
        chat = chats[i]
      }
    }
    return chat
      .map(r => r.doc)
      .reverse()
      .reduce((acc, event) => {
        if (!acc.length) return [event]
        let last = acc[acc.length - 1]
        if (
          last.pubkey === event.pubkey &&
          last.created_at + 120 >= event.created_at
        ) {
          last.appended = last.appended || []
          last.appended.push(event)
        } else {
          acc.push(event)
        }
        return acc
      }, [])
  },

  onNewMessage(peerPubKey, callback = () => {}) {
    // listen for changes
    let changes = db.changes({
      live: true,
      since: 'now',
      include_docs: true,
      filter: '_view',
      view: 'main/messages'
    })

    changes.on('change', change => {
      if (
        change.doc.pubkey === peerPubKey ||
        change.doc.tags.find(([t, v]) => t === 'p' && v === peerPubKey)
      ) {
        callback(change.doc)
      }
    })

    return changes
  },

  async dbGetEvent(id) {
    try {
      return await db.get(id)
    } catch (err) {
      if (err.name === 'not_found') return null
      else throw err
    }
  },

  onEventUpdate(id, callback = () => {}) {
    let changes = db.changes({
      live: true,
      since: 'now',
      include_docs: true,
      doc_ids: [id]
    })

    changes.on('change', change => callback(change.doc))

    return changes
  },

  async dbGetMentions(ourPubKey, limit = 40, since, until) {
    let result = await db.query('main/mentions', {
      include_docs: true,
      descending: true,
      startkey: [ourPubKey, until],
      endkey: [ourPubKey, since],
      limit
    })
    return result.rows.map(r => r.doc)
  },

  onNewMention(ourPubKey, callback = () => {}) {
    // listen for changes
    let changes = db.changes({
      live: true,
      since: 'now',
      include_docs: true,
      filter: '_view',
      view: 'main/mentions'
    })

    changes.on('change', change => {
      if (change.doc.tags.find(([t, v]) => t === 'p' && v === ourPubKey)) {
        callback(change.doc)
      }
    })

    return changes
  },

  onNewAnyMessage(callback = () => {}) {
    // listen for changes
    let changes = db.changes({
      live: true,
      since: 'now',
      include_docs: true,
      filter: '_view',
      view: 'main/messages'
    })

    changes.on('change', change => {
      callback(change.doc)
    })

    return changes
  },

  async dbGetUnreadNotificationsCount(ourPubKey, since) {
    let result = await db.query('main/mentions', {
      include_docs: false,
      descending: true,
      startkey: [ourPubKey, {}],
      endkey: [ourPubKey, since]
    })
    return result.rows.length
  },

  async dbGetUnreadMessages(pubkey, since) {
    let result = await db.query('main/messages', {
      include_docs: false,
      descending: true,
      startkey: [pubkey, {}],
      endkey: [pubkey, since]
    })
    return result.rows.length
  },

  async dbGetProfile(pubkey) {
    let result = JSON.parse(localStorage.getItem('friends'))
    for (let i = 0; i < result.length; i++) {
      if(result.pubkey == pubkey){
        return result
      }
    }
  }
}

var streams = {}

self.onmessage = async function (ev) {
  let {name, args, id, stream, cancel} = JSON.parse(ev.data)

  if (stream) {
    let changes = methods[name](...args, data => {
      self.postMessage(
        JSON.stringify({
          id,
          data,
          stream: true
        })
      )
    })
    streams[id] = changes
  } else if (cancel) {
    streams[id].cancel()
    delete streams[id]
  } else {
    var reply = {id}
    try {
      let data = await methods[name](...args)
      reply.success = true
      reply.data = data
    } catch (err) {
      reply.success = false
      reply.error = err.message
    }

    self.postMessage(JSON.stringify(reply))
  }
}
