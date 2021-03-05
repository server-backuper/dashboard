function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (getCookie('token') == undefined) {
  location.pathname = '/authorize';
} else {
  fetch('https://api.server-backuper.ml/servers', {
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${getCookie('token')}`
    }
  }).then(function (r) {
    return r.json();
  }).then(function (data) {
    console.log(data);
    data.forEach(function (elem) {
      let e = document.createElement('img');
      e.src = `https://cdn.discordapp.com/icons/${elem.id}/${elem.icon}.png?size=256`;
      document.body.querySelector('#servers').appendChild(e);
    });
  });
}
