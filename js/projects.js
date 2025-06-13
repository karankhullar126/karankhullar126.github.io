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

        // Loop through the items and create div elements
        for (let i = 0; i < items.length; i++) {
            // Card
            const cardPortfoliio = document.createElement('div');
            cardPortfoliio.className = 'card-portfolio' 
            // Youtube
            if(items[i]['youtube']) {
                let frame = document.createElement('iframe')
                frame.src = items[i].youtube
                frame.className = 'image-view'
                cardPortfoliio.appendChild(frame)
            } else {
                // Image
                const img = document.createElement('img');
                img.src = items[i].image;
                img.className = 'image-view'
                cardPortfoliio.appendChild(img)
            }
            
            // card content
            const cardContent = document.createElement('div')
            cardContent.className = "card-content"
            cardPortfoliio.appendChild(cardContent)
            // Title
            const title = document.createElement('h2')
            title.className = "card-title-portfolio"
            title.textContent = items[i].title
            cardContent.appendChild(title)
            // Description
            const description = document.createElement('p')
            description.className = 'card-description'
            description.innerHTML = items[i].description
            cardContent.appendChild(description)

            // App Store
            if(items[i]['appstoreLink']) {
                let anchorTag = document.createElement('a')
                anchorTag.href = items[i].appstoreLink
                
                const appStoreImg = document.createElement('img')
                appStoreImg.src = 'images/svg/AppStore.svg'
                appStoreImg.className = 'appStore'

                anchorTag.appendChild(appStoreImg)
                cardContent.appendChild(anchorTag)
            }

            if(items[i]['githubLink']) {
                let anchorTag = document.createElement('a')
                anchorTag.href = items[i].githubLink
                
                const appStoreImg = document.createElement('img')
                appStoreImg.src = 'images/GitHub.png'
                appStoreImg.className = 'appStore'

                anchorTag.appendChild(appStoreImg)
                cardContent.appendChild(anchorTag)
            }

            itemList.appendChild(cardPortfoliio)

            // const itemDiv = document.createElement('div');
            // itemDiv.className = 'item';
            // itemDiv.textContent = items[i];
            // itemList.appendChild(itemDiv);
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    function getProjectDetailElement(project) {
                    // Card
                    const cardPortfoliio = document.createElement('div');
                    cardPortfoliio.className = 'card-portfolio' 
                    // Youtube
                    if(project['youtube']) {
                        let frame = document.createElement('iframe')
                        frame.src = project.youtube
                        frame.className = 'image-view'
                        cardPortfoliio.appendChild(frame)
                    } else {
                        // Image
                        const img = document.createElement('img');
                        img.src = project.image;
                        img.className = 'image-view'
                        cardPortfoliio.appendChild(img)
                    }
                    
                    // card content
                    const cardContent = document.createElement('div')
                    cardContent.className = "card-content"
                    cardPortfoliio.appendChild(cardContent)
                    // Title
                    const title = document.createElement('h2')
                    title.className = "card-title-portfolio"
                    title.textContent = project.title
                    cardContent.appendChild(title)
                    // Description
                    const description = document.createElement('p')
                    description.className = 'card-description'
                    description.innerHTML = project.description
                    cardContent.appendChild(description)
        
                    // App Store
                    if(project['appstoreLink']) {
                        let anchorTag = document.createElement('a')
                        anchorTag.href = project.appstoreLink
                        
                        const appStoreImg = document.createElement('img')
                        appStoreImg.src = 'images/svg/AppStore.svg'
                        appStoreImg.className = 'appStore'
        
                        anchorTag.appendChild(appStoreImg)
                        cardContent.appendChild(anchorTag)
                    }
        
                    if(project['githubLink']) {
                        let anchorTag = document.createElement('a')
                        anchorTag.href = project.githubLink
                        
                        const appStoreImg = document.createElement('img')
                        appStoreImg.src = 'images/GitHub.png'
                        appStoreImg.className = 'appStore'
        
                        anchorTag.appendChild(appStoreImg)
                        cardContent.appendChild(anchorTag)
                    }

                    return cardPortfoliio
            
    }