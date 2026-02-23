

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');



    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'Email';
    emailInput.className = 'input-value';
    emailInput.required = true;


    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.className = 'input-value';
    passwordInput.required = true;


    const repeatPasswordInput = document.createElement('input');
    repeatPasswordInput.type = 'password';
    repeatPasswordInput.name = 'repeat-password';
    repeatPasswordInput.placeholder = 'Repeat Password';
    repeatPasswordInput.className = 'input-value';
    repeatPasswordInput.required = true;


    const signupButton = document.createElement('button');
    signupButton.textContent = 'Sign-Up';
    signupButton.className = 'signup-button';
    signupButton.type = 'submit';

    signupForm.append(
        emailInput,
        passwordInput,
        repeatPasswordInput,
        signupButton
    );

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (passwordInput.value !== repeatPasswordInput.value) {
            alert('Passwords do not match!');
            return;
        }

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                window.location.href = 'sign-in.html';
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
        }
    });

    const googleDiv = document.createElement('div');

    googleDiv.id = 'google-signup';

    const hr = document.createElement('hr');

    signupForm.append(signupButton);
    hr.style.width = '90%';
    hr.style.margin = '0px auto';
    hr.style.border = '0.4px solid #ccc';
    signupForm.appendChild(hr);
    googleDiv.style.display = 'flex';
    googleDiv.style.justifyContent = 'center';
    googleDiv.style.alignItems = 'center';


    signupForm.append(googleDiv);







    window.handleGoogleSignUp = async (response) => {
        try {
            const res = await fetch('http://localhost:3000/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: response.credential })
            });

            const data = await res.json();

            if (res.ok) {

                window.location.href = 'WordleSelector.html';
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert('Google sign-in failed');
        }
    };


    google.accounts.id.initialize({
        client_id: '875738114512-171p73uqojdbmh33fkmv3n9ge1vncjdn.apps.googleusercontent.com',
        callback: handleGoogleSignUp
    });

    google.accounts.id.renderButton(
        document.getElementById('google-signup'),
        { theme: 'outline', size: 'large', text: 'signup_with' }
    );




});













