fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        Authorization: 'Bearer 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'
 },
    body: JSON.stringify({
        query: `query GetRepository {
  user (login: "areel007") {
    starredRepositories {
      totalCount
    },
    login,
    avatarUrl,
    name,
    bio,
    followers(first: 10) {
      totalCount
    },
    following(first: 10) {
      totalCount
    },
    location,
    websiteUrl,
    twitterUsername,
    organizations(first: 10) {
      edges {
        node {
          avatarUrl
        }
      }
    },
    repositories(first: 10) {
      edges {
        node {
          name,
          updatedAt,
          createdAt,
          description,
          languages(first: 1) {
            edges {
              node {
                color,
                name
              }
            }
          }
        }
      }
    },
  }
}`
    })
})
.then(res => res.json())
.then(data => {
  document.querySelector('.avatar img').src = data.data.user.avatarUrl;
  document.querySelector('.user-profile-pic img').src = data.data.user.avatarUrl
  document.querySelector('.user-mobile-menu-avatar img').src = data.data.user.avatarUrl
  document.querySelector('.repo-count').innerHTML = data.data.user.repositories.edges.length
  document.querySelector('.name').innerHTML = data.data.user.name
  document.querySelector('.username').innerHTML = data.data.user.login
  document.querySelector('.user-mobile-menu p').innerHTML = data.data.user.login
  document.querySelector('.profile-info').innerHTML = data.data.user.bio
  document.querySelector('.follower-count').innerHTML = data.data.user.followers.totalCount
  document.querySelector('.following-count').innerHTML = data.data.user.following.totalCount
  document.querySelector('.star-count').innerHTML = data.data.user.starredRepositories.totalCount
  document.querySelector('.location__location span').innerHTML = data.data.user.location
  document.querySelector('.portfolio__link span').innerHTML = data.data.user.websiteUrl
  document.querySelector('.twitter span').innerHTML = data.data.user.twitterUsername
  document.querySelector('.org_one img').src = data.data.user.organizations.edges[0].node.avatarUrl
  document.querySelector('.org_two img').src = data.data.user.organizations.edges[1].node.avatarUrl
  document.querySelector('.repos').innerHTML = data.data.user.repositories.edges.map( data => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
   return `
    <div class="repo">
      <div class="repo-name-details">
                                <p class="repo-title">${data.node.name}</p>
                                <p class="repo-subtitle">${data.node.description ? data.node.description : ''}</p>
                                <div class="repo-tech-and-updated-at">
                                    <div class="repo-tech">
                                        <div class="tech-color" style="background-color: ${data.node.languages.edges[0].node.color}"></div>
                                        <p class="technology">${data.node.languages.edges[0].node.name}</p>
                                    </div>
                                    <p class="updated-at">Updated on <span>${months[data.node.updatedAt.split(/[- :]/)[1].split('')[1]]} ${data.node.updatedAt.split(/[- :]/)[0]}</span></p>
                                </div>
                            </div>
                            <div class="star-button">
                                <button>
                                    <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                                    <span>Star</span>
                                </button>
                            </div>
    </div>
    `
  }).join('')
})

const hamburgerMenu = document.querySelector('.hamburger-menu')
hamburgerMenu.addEventListener('click', () => {
  document.querySelector('.mobile-navigation').classList.add('show-mobile-menu')
})

const mobileHamburger = document.querySelector('.mobile-menu-hamburger')
mobileHamburger.addEventListener('click', () => {
  document.querySelector('.mobile-navigation').classList.remove('show-mobile-menu')
})

const plusDropdown = document.querySelector('.arrow-plus')
plusDropdown.addEventListener('click', () => {
  document.querySelector('.plus-dropdown').classList.toggle('show-plus-dropdown')
})

const profileDropdown = document.querySelector('.profile-user')
profileDropdown.addEventListener('click', () => {
  document.querySelector('.profile-user-dropdown').classList.toggle('show-profile-dropdown')
})
