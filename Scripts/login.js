const firebaseConfig = {
    apiKey: "AIzaSyAlHGuY7YQMm_2Y2rQDUtNEqBvFbD9uI2E",
    authDomain: "nyt-library-d186c.firebaseapp.com",
    projectId: "nyt-library-d186c",
    storageBucket: "nyt-library-d186c.appspot.com",
    messagingSenderId: "564511583303",
    appId: "1:564511583303:web:09faf990ec2de6475f5562"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  const createUser = (user) => {
    db.collection("users")
      .add(user)
      .then((docRef) => console.log("Document written with ID: ", docRef.id))
      .catch((error) => console.error("Error adding document: ", error));
  };
  
  //Dar de alta usuario
  const signUpUser = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log(`Your ${user.email} has been correctly registered`)
        alert(`Your ${user.email} ID:${user.uid} has been correctly registered`)
        // ...
        // Guarda El usuario en Firestore
        createUser({
          id: user.uid,
          email: user.email
        })
  
  
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("Error en el sistema" + error.message);
      });
  
  };
  
  async function GoogleSignup (){
    let provider = new firebase.auth.GoogleAuthProvider();//Sirve para llamar al proveedor de google
    const ref = db.collection('users').doc();
    try{
        const response = await firebase.auth().signInWithPopup(provider);
        console.log(response);
  
        let newUser = { //registra al usuario en la base de datos de firebase(en caso de que no esté) cuando se logea atraves de google
          email: response.user.email,
          name: response.user.id,
        }
        
        db.collection("users")
          .where("email", "==", response.users.email)
          .get()
          .then((querySnapshot) => {
            console.log(querySnapshot);
            //Condicional que verifica si en la base de datos hay un usuario con ese nombre, si no lo hay lo crea. El .size seria como el length del firebase con ese usuario.
            if(querySnapshot.size == 0){
              db.collection("users")
              .add(newUser)
              .then((docRef) => console.log("Document written with ID: ", docRef.id))
              .catch((error) => console.error("Error adding document: ", error));
            } else{
              console.log(`usuario de nombre ${response.users.id} ya existe en la BBDD firestore.`);
            }
          });
          console.log(response.users.id);
        }catch(error){  
          console.log(error);
      }
        }
  
  //Iniciar sesion
  const signInUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        console.log(`se ha logado ${user.email} ID:${user.uid}`)
        alert(`Welcome ${user.email}!!`)
        console.log(user);
        const cuUser = firebase.auth().currentUser;//Obtenemos el usuario actual
        console.log(cuUser.email);
        window.location.href = "./quiz.html";
      }
      )
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
  }
  
  // Iniciar sesion con google
  
  //Función de login con Auth
  async function Googlelogin (){
    let provider = new firebase.auth.GoogleAuthProvider();//Sirve para llamar al proveedor de google
    try{
        const response = await firebase.auth().signInWithPopup(provider);
        console.log(response);
        
        db.collection("users")
          .where("email", "==", response.users.email)
          .get()
          .then((querySnapshot) => {
            console.log(querySnapshot);
            //Condicional que verifica si en la base de datos hay un usuario con ese nombre, si no lo hay lo crea. El .size seria como el length del firebase con ese usuario.
            if(querySnapshot.size == 0){
              db.collection("users")
              .add(newUser)
              .then((docRef) => console.log("Document written with ID: ", docRef.id))
              .catch((error) => console.error("Error adding document: ", error));
            } else{
              console.log(`usuario de nombre ${response.users.id} ya existe en la BBDD firestore.`);
            }
          });
          console.log(response.users.id);
  
        // return response.user;
  
    }catch(error){  
        console.log(error);
    }
  }
  
  //Cerrar sesion
  const signOut = () => {
    let user = firebase.auth().currentUser;
  
    firebase.auth().signOut().then(() => {
      window.location.href = "./index.html";
      console.log("Sale del sistema: " + user.user)
    }).catch((error) => {
      console.log("hubo un error: " + error);
    });
  }