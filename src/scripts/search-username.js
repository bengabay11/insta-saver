Vue.component('search-username', {

    data: function () {
        return {
            username : "",
            showImage : false,
            loading : false,
            imageAddress : ""
        }
    },

    template: 
        `<div class="main-section">
            <div class="search-username" v-if="!showImage">
                <label>
                    <input type="search" title="search" aria-label="search" class="search-username-input special-font"
                     placeholder="username" v-model="username" v-on:keyup.enter="getProfileData" autofocus>
                </label>
            </div>
            <div class="loader" v-if="loading">
            </div>
            <div class="profile-image" v-if="showImage">
                <div class="username">{{username}}</div>
                <div class="profile-image-options">
                    <button class=back-button @click="back">🔙</button>                                                                                              
                </div>
                <img :src="imageAddress" alt="Profile Image is not available.">
            </div>
     </div>`,

    methods: {
        getProfileData() {
            this.loading = true;
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
                let profileImages = response['data']['user']['hd_profile_pic_versions'];
                this.imageAddress = profileImages[profileImages.length - 1]['url'];
                this.loading = false;
                this.showImage = true;});
        },

        back(){
            this.username  = "";
            this.showImage = false;
        }
    }
});