'use strict'

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
    let newData = data.filter((e) => {
      return e.owner;
    });
    newData.forEach(function (elem) {
      let name = document.createElement('h1');
      let link = document.createElement('a');
      let separator = document.createElement('div');
      separator.classList.add('separator');
      name.classList.add('small-header');
      name.classList.add('header');
      name.textContent = elem.name;
      link.textContent = 'Go to Dashboard';
      link.classList.add('header');
      link.classList.add('very-small-header');
      window.onprogress = 
      /**
       * 
       * @param {ProgressEvent} e 
       */
      (e) => {
        console.log(e.total);
      }
      // e.src = elem.icon ? `https://cdn.discordapp.com/icons/${elem.id}/${elem.icon}.png?size=256` : 'https://cdn.discordapp.com/embed/avatars/0.png';
      document.body.querySelector('div#servers').appendChild(name);
      document.body.querySelector('div#servers').appendChild(link);
      document.body.querySelector('div#servers').appendChild(separator);
      document.body.querySelector('div#servers').appendChild(separator);
    });
  });
}
