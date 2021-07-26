let googleUser = null //makes a global variable so you can use the user's info throughout the file

window.onload = () => {
    firebase.auth().onAuthStateChanged(user =>{
        if(user){
            //will run in user is logged in
            console.log("logged in as", user.displayName);
            googleUser = user;

        }
        else{
            //will run in user is NOT logged in
            console.log("not logged in");
        }
    })

    const createNoteButton = document.querySelector("#createNote");
    createNoteButton.addEventListener("click", () =>{
       //get values from the notes form
        const noteTitle = document.querySelector("#noteTitle").value;
        const noteText = document.querySelector("#noteText").value;
        console.log(noteTitle, noteText);

        //write values to database
        firebase.database().ref(`/users/${googleUser.uid}`).push({
            title: noteTitle,
            text: noteText
        }).then(()=>{ //runs after the note is added to the database, resets values to null
            console.log("database write successful")
            document.querySelector("#noteTitle").value = null
            document.querySelector("#noteText").value= null
        })
        //use googleUser because that variable is set to the user
        .catch(error => {
            console.log("error writing new note: ", error)
        })
    })
}