// Find stray console.log calls
// console.log = function(s) {
//   console.trace(s);
// }

var apos = require('apostrophe')({
  shortName: 'sandbox',
  hostName: 'sandbox',

  modules: {
    'link-widgets': {},
    'apostrophe-express': {
      middleware: [
        // for now, always log the user in as admin.
        // We'll remove this when the apostrophe-auth module
        // is ready.
        function(req, res, next) {
          req.user = {
            _id: 'admin',
            username: 'admin',
            permissions: {
              admin: true,
              // we have to spell this out because the
              // auth module isn't here to automate this
              // for us
              edit: true,
              'admin-grommet': true,
              'edit-grommet': true
            }
          };

          return next();
        }
      ]
    },
    'grommets': {
      alias: 'grommets',
      extend: 'apostrophe-pieces',
      name: 'grommet',
      label: 'Grommet',
      pluralLabel: 'Grommets',
      addFields: [
        {
          type: 'string',
          name: 'inventor',
          label: 'Inventor'
        },
        {
          type: 'area',
          name: 'body',
          label: 'Description',
          options: {
            widgets: {
              'link': {},
              'apostrophe-rich-text': {
                toolbar: [ 'Bold', 'Italic', 'Link', 'Anchor', 'Unlink' ]
              }
            }
          }
        }
      ]
    },
    events: {
      extend: 'apostrophe-pieces',
      name: 'event',
      label: 'Event',
      alias: 'events',
      addFields: [
        {
          type: 'tags',
          name: 'tags',
          label: 'Tags'
        }
      ]
    },
    'events-widgets': {
      extend: 'apostrophe-pieces-widgets',
    },
    'events-pages': {
      extend: 'apostrophe-pieces-pages'
    },
    'apostrophe-pages': {
      park: [
        {
          title: 'Events',
          type: 'events',
          slug: '/events',
          published: true
        }
      ],
      types: [
        {
          name: 'home',
          label: 'Home'
        },
        {
          name: 'default',
          label: 'Default'
        }
      ]
    },
    'apostrophe-users': {
      groups: [
        {
          title: 'Guest',
          permissions: [ ]
        },
        {
          title: 'Editor',
          permissions: [ 'edit' ]
        },
        {
          title: 'Admin',
          permissions: [ 'admin' ]
        }
      ]
    }
  },
  afterInit: function(callback) {
    console.log('initialized');
    return setImmediate(callback);
  }
});
