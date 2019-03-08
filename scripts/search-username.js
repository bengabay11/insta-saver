Vue.component('search-username', {

    data: function () {
        return {
            username : ""
        }
    },

    template: `<div class="main-section">
        <label>
            <input type="search" class="search-username-input" placeholder="username"  v-model="username" autofocus>
        </label>
        <button class=search-username-button @click="getProfileData">🔍</button>
    </div>`,

    methods: {
        getProfileData(){
            axios.get(`https://instagram.com/${this.username}?utm_source=ig_profile_share&igshid=1qdytn9yec9gd`).then((response) => {
                let entryData = "{";
                let index = response['data'].indexOf('"entry_data"') + 13;
                let openBrackets = 1;
                let closeBrackets = 0;
                let data = response['data'].substr(index, response['data'].length - index);
                let newIndex = 1;
                while (openBrackets !== closeBrackets){
                    let currentLetter = data.charAt(newIndex);
                    if (currentLetter === "{"){
                        openBrackets++;
                    }
                    else if (currentLetter === "}"){
                        closeBrackets++;
                    }
                    entryData += currentLetter;
                    newIndex++;
                }
                let entryDataObject = JSON.parse(entryData);
                let id = entryDataObject['ProfilePage']['0']['graphql']['user']['id'];
                this.getProfileImage(id);
            });
        },

        getProfileImage(id){
            axios.get(`https://i.instagram.com/api/v1/users/${id}/info/`).then((response) => {
                let profileImages = response['data']['user']['hd_profile_pic_versions']
                let address = profileImages[profileImages.length-1]['url'];
                axios.get(address).then((response) => {
                    let imageData = response['data'];
                    console.log(imageData);
                });
            });
        }
    }
});