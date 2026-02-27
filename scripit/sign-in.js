
document.addEventListener('DOMContentLoaded', () => {
    const signingForm = document.querySelector('.signing-form');









    const signInButton = document.createElement('button');
    signInButton.type = 'button';
    signInButton.textContent = 'Play as guest';
    signInButton.className = 'signing-button';
    signInButton.addEventListener('click', () => {
        localStorage.setItem("mode", "guest");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        localStorage.setItem("userPicture", "/images/profile.svg");
        window.location.href = "WordleSelector.html";
    })




    const hr = document.createElement('hr');
    hr.style.width = '80%';
    hr.style.margin = '20px auto';
    hr.style.marginBottom = '20px';
    hr.style.border = '1px solid #ccc';


    const googleDiv = document.createElement('div');
    googleDiv.id = 'google-signin';
    googleDiv.style.marginBottom = '20px';
    googleDiv.style.width = '100%';

    googleDiv.style.display = 'flex';
    googleDiv.style.justifyContent = 'center';





    signingForm.append(

        signInButton,
        hr,
        googleDiv,

    );




    window.handleGoogleSignIn = async (response) => {
        try {
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: response.credential })
            });

            const data = await res.json();

            if (res.ok) {

                localStorage.setItem("userId", data.user_id);
                localStorage.setItem("userEmail", data.user_email);
                localStorage.setItem("userPicture", data.user_picture);
                localStorage.setItem("mode", "user");

                window.location.href = 'WordleSelector.html';
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error("Google sign-in failed:", err);
        }
    };






    google.accounts.id.initialize({
        client_id: '875738114512-171p73uqojdbmh33fkmv3n9ge1vncjdn.apps.googleusercontent.com',
        callback: handleGoogleSignIn,
        scope: "openid email profile"
    });



    google.accounts.id.renderButton(
        googleDiv,
        { theme: 'outline', size: 'large', text: 'signin_with' }
    );
});







