fetch('projects.json', {
    method: 'GET',
    mode:"no-cors" // or 'POST' if needed
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const itemList = document.getElementById('portfolio-list');
        const items = data.projects; // Access the items array
        const projectGrid = document.createElement('div')
        projectGrid.className = 'projects-grid'

        // Loop through the items and create div elements
        for (let i = 0; i < items.length; i++) {
            const projectCard = document.createElement('div')
            projectCard.className = 'project-card'

            // Youtube
            if(items[i]['youtube']) {
                let frame = document.createElement('iframe')
                frame.src = items[i].youtube
                frame.className = 'project-image'
                projectCard.appendChild(frame)
            } else {
                const image = document.createElement('img')
                image.className = 'project-image'
                image.src = items[i].image;
                projectCard.appendChild(image)
            }

            const projectInfo = document.createElement('div')
            projectInfo.className = 'project-info'
            

            const projectTitle = document.createElement('h3')
            projectTitle.textContent = items[i].title
            projectInfo.appendChild(projectTitle)

            const projectDescription = document.createElement('p')
            projectDescription.textContent = items[i].shortDescription
            projectInfo.appendChild(projectDescription)

            const techStack = document.createElement('div')
            techStack.className = 'tech-stack'
            techStack.textContent = items[i].technologyStack
            projectInfo.appendChild(techStack)

            if (items[i]['appstoreLink'] || items[i]['githubLink']) {

                const anchor = document.createElement('a')
                anchor.className = 'appstore-link'
                anchor.href = items[i]['appstoreLink'] ? items[i]['appstoreLink'] : items[i]['githubLink']

                const appStoreImage = document.createElement('img')
                appStoreImage.src = items[i]['appstoreLink'] ? 'images/svg/AppStore.svg' : 'images/Github_white.png'
                anchor.appendChild(appStoreImage)

                projectInfo.appendChild(anchor)
            }
            


            projectCard.appendChild(projectInfo)
            projectGrid.appendChild(projectCard)


        }

        itemList.appendChild(projectGrid)

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });