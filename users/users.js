
function loadUsers (){
    fetch ('https://randomuser.me/api/?results=200')
    .then(res=>res.json())
    .then(data=>showUserDetails(data.results))
}

loadUsers();

function showUserDetails(users){
    let uDiv = document.getElementById('users');
        // console.log(uDiv);
    for(let user of users){
        // console.log(user);
        
        let div = document.createElement('div');
        div.classList.add('user')
        div.innerHTML = `
        <h3>Name : ${user?.name?.title} ${user?.name?.first} ${user?.name?.last}</h3>
        <p>Email : ${user?.email}</p>
        <p>Phone : ${user?.phone}</p>
        <p>Gender : ${user?.gender}</p>
        <p>Location : ${user?.location?.state}, City : ${user?.location?.city}</p>
        <img src="${user?.picture?.large}" alt="">
        `;
        // console.log(div);
        uDiv.appendChild(div)
        
        
        
        
    }
    

}