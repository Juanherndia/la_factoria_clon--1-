// Configura Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDzobsoXSo3TI2uaQaJEDMoEZjfaB8L8nk",
  authDomain: "factoriaweb-1078.firebaseapp.com",
  projectId: "factoriaweb-1078",
  storageBucket: "factoriaweb-1078.firebasestorage.app",
  messagingSenderId: "5957322634",
  appId: "1:5957322634:web:b310c3ed3d988ba2ebaa73",
};

firebase.initializeApp(firebaseConfig);

// Login
function iniciarSesion() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const mensaje = document.getElementById("mensaje");

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      mensaje.style.color = "green";
      mensaje.innerText = "¡Bienvenido, " + user.email + "!";
      // Redirigir si deseas
      location.href = "index.html";
    })
    .catch((error) => {
      mensaje.style.color = "red";

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-login-credentials"
      ) {
        mensaje.innerText = "Credenciales incorrectas. Vuelve a intentarlo.";
      } else {
        mensaje.innerText = "Error: " + error.message;
      }
    });
}

// Registro
function registrarUsuario() {
  const email = document.getElementById("registroEmail").value;
  const password = document.getElementById("registroPassword").value;
  const mensajeRegistro = document.getElementById("mensajeRegistro");

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      mensajeRegistro.style.color = "green";
      mensajeRegistro.innerText = "Cuenta creada con éxito.";
    })
    .catch((error) => {
      mensajeRegistro.style.color = "red";
      if (error.code === "auth/email-already-in-use") {
        mensajeRegistro.innerText = "Este correo ya está en uso.";
      } else if (error.code === "auth/weak-password") {
        mensajeRegistro.innerText =
          "La contraseña debe tener al menos 6 caracteres.";
      } else {
        mensajeRegistro.innerText = "Error: " + error.message;
      }
    });
}
