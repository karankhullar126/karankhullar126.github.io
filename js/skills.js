fetch('Skills.json', {
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
        const itemList = document.getElementById('skills-section');
        const items = data.skills; // Access the items array

        // Loop through the items and create div elements
        for (let i = 0; i < items.length; i++) {
            // Card
            const cardTitle = document.createElement('div');
            cardTitle.className = 'category-title' 
            cardTitle.textContent = items[i].section 
            itemList.appendChild(cardTitle)
            
            const skillgrid = document.createElement('div')
            skillgrid.className = 'skills-grid'


            for (let j = 0; j < items[i].values.length; j++) {
                const skillTitle = document.createElement('div')
                skillTitle.className = 'skill-tile'
                skillTitle.textContent = items[i].values[j]
                skillgrid.appendChild(skillTitle)
            }

            itemList.appendChild(skillgrid)
           

        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });