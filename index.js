groups = [];
username = 'saurabhburewar';

// const tl = gsap.timeline({ defaults: { ease: "power1.out" }, repeat: -1, repeatDelay: 1});

// tl.to(".bannerneonbar2", { y: '500%', duration: 2, stagger: 0.25 });
// tl.to(".bannerneonbar2", { opacity: 0, duration: 1, stagger: 0.25, delay: -1 });
// tl.to('.bannerneonbar3', { x: "-400%", opacity: 1, duration: 2, stagger: 0.25, delay: -1 });
// tl.to(".bannerneonbar3", { opacity: 0, duration: 1, stagger: 0.25 });
// tl.to(".bannerneonbar1", { y: '500%', duration: 3, stagger: 0.25, delay: -4 });
// tl.to(".bannerneonbar1", { opacity: 0, duration: 1, stagger: 0.25, delay: -1 });

function display(data) {
    for(let i = 0; i < data.length; i++) {
        let name = data[i].name;
        group = name.substring(0, name.indexOf('_'));
        if (group == '') {
            group = 'Others';
        }
        repo = name.substring(name.indexOf('_')+1, name.length);
        if (groups.includes(group)) {
            item = document.createElement('a');
            item.className = 'groupItem';
            item.href = data[i].html_url;
            item.innerHTML = repo;
            let index = groups.indexOf(group);
            document.getElementById(`group${index}Box`).appendChild(item)
        } else {
            groups.push(group);
            let ind = groups.indexOf(group);

            groupdiv = document.createElement('div');
            groupdiv.className = 'groupBox';
            groupdiv.id = `group${ind}Box`;

            grouphead = document.createElement('div');
            grouphead.className = 'groupHead';
            grouphead.innerHTML = group;
            groupdiv.appendChild(grouphead);

            item = document.createElement('a');
            item.className = 'groupItem';
            item.href = data[i].html_url;
            item.innerHTML = repo;
            groupdiv.appendChild(item);

            document.getElementById('listboxin').appendChild(groupdiv);
        }
    }
}

function displaycontri(data1) {
    for(let i = 0; i < data1.length; i++) {
        if (groups.includes('Contributor')) {
            contriItem = document.createElement('a');
            contriItem.className = 'contriItem';
            contriItem.href = data1[i].html_url
            contriItem.innerHTML = data1[i].name;
            document.getElementById('contriBox').appendChild(contriItem);
        } else {
            groups.push('Contributor');

            contriBox = document.createElement('div');
            contriBox.id = 'contriBox';

            contrihead = document.createElement('div');
            contrihead.id = 'contriHead';
            contrihead.innerHTML = 'Contributor';
            contriBox.appendChild(contrihead);

            contriItem = document.createElement('a');
            contriItem.className = 'contriItem';
            contriItem.href = data1[i].html_url
            contriItem.innerHTML = data1[i].name;
            contriBox.appendChild(contriItem);

            document.getElementById('listboxin').appendChild(contriBox);
        }
    }
}

function changePage(userdata) {
    document.title = `${userdata.login}/repos`
    document.getElementById('bannerName1').innerHTML = userdata.name;
    document.getElementById('bannerName2').innerHTML = userdata.login;
    document.getElementById('bannerPic').style.backgroundImage = `url(${userdata.avatar_url})`;
    link = document.createElement('link');
    link.rel = 'icon';
    link.href = userdata.avatar_url;
    document.getElementsByTagName('head')[0].appendChild(link);
    console.log(userdata);

    if (userdata.blog != null) {
        blogdiv = document.createElement('a');
        blogdiv.className = 'bannerlinks';
        blogdiv.id = 'bloglink';
        blogdiv.href = userdata.blog;
        blogdiv.innerHTML = userdata.blog;
        blogdiv.style.display = 'flex'
        blogdiv.style.justifyContent = 'center'
        document.getElementById('bannerlinkBox1').appendChild(blogdiv);
    }
    if (userdata.email != null) {
        ediv = document.createElement('a');
        ediv.className = 'bannerlinks';
        ediv.id = 'emaillink';
        ediv.href = userdata.email;
        ediv.innerHTML = `Email: ${userdata.email}`;
        ediv.style.display = 'flex'
        ediv.style.justifyContent = 'center'
        document.getElementById('bannerlinkBox1').appendChild(ediv);
    }
    if (userdata.twitter_username != null) {
        tdiv = document.createElement('a');
        tdiv.className = 'bannerlinks';
        tdiv.id = 'tweetlink';
        tdiv.href = userdata.twitter_username;
        tdiv.innerHTML = userdata.twitter_username;
        tdiv.style.display = 'flex'
        tdiv.style.justifyContent = 'center'
        document.getElementById('bannerlinkBox1').appendChild(tdiv);
    }
    if (userdata.company != null) {
        comdiv = document.createElement('div');
        comdiv.className = 'bannerlinks';
        comdiv.id = 'comlink';
        comdiv.innerHTML = userdata.company;
        comdiv.style.display = 'flex'
        comdiv.style.justifyContent = 'center'
        document.getElementById('bannerlinkBox1').appendChild(comdiv);
    }
    if (userdata.location != null) {
        locdiv = document.createElement('div');
        locdiv.className = 'bannerlinks';
        locdiv.id = 'loclink';
        locdiv.innerHTML = userdata.location;
        locdiv.style.display = 'flex'
        locdiv.style.justifyContent = 'center'
        document.getElementById('bannerlinkBox1').appendChild(locdiv);
    }
}

fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(userdata => {
        changePage(userdata);
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`)
            .then(response => response.json())
            .then(data => {
                display(data);
                fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=member`)
                    .then(res => res.json())
                    .then(data1 => displaycontri(data1))
            })
    })
