var tlsOptions = {
//ca: [ fs.readFileSync('/etc/ldap/cacert.pem') ]
};

var ldap = require('ldapjs');
var client = ldap.createClient({url: 'ldaps://ldap.univ-rennes1.fr',tlsOptions: tlsOptions});

var opts = {
  filter: '(uid=obarais)',
  scope: 'sub',
  attributes: '*'//['cn', 'sn', 'uid']
};

client.search('ou=People,dc=univ-rennes1,dc=fr', opts, function(err, res) {

  res.on('searchEntry', function(entry) {
    console.log('entry: ' + JSON.stringify(entry.object));
  });
  res.on('searchReference', function(referral) {
    console.log('referral: ' + referral.uris.join());
  });
  res.on('error', function(err) {
    console.error('error: ' + err.message);
  });
  res.on('end', function(result) {
    console.log('status: ' + result.status);
    client.unbind(function(err) {
	});
  });
});
