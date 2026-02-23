document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.reset-form');


    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'Your Email';
    emailInput.className = 'reset-value';
    emailInput.required = true;


    const newPasswordInput = document.createElement('input');
    newPasswordInput.type = 'password';
    newPasswordInput.name = 'newPassword';
    newPasswordInput.placeholder = 'New Password';
    newPasswordInput.className = 'reset-value';
    newPasswordInput.required = true;


    const repeatNewPasswordInput = document.createElement('input');
    repeatNewPasswordInput.type = 'password';
    repeatNewPasswordInput.name = 'repeatPassword';
    repeatNewPasswordInput.placeholder = 'Repeat Password';
    repeatNewPasswordInput.className = 'reset-value';
    repeatNewPasswordInput.required = true;


    const resetButton = document.createElement('button');
    resetButton.type = 'submit';
    resetButton.textContent = 'Reset Password';
    resetButton.className = 'reset-button';


    form.appendChild(emailInput);
    form.appendChild(newPasswordInput);
    form.appendChild(repeatNewPasswordInput);
    form.appendChild(resetButton);


    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const newPassword = newPasswordInput.value;
        const repeatPassword = repeatNewPasswordInput.value;


        if (newPassword !== repeatPassword) {
            alert('Passwords do not match');
            return;
        }

        try {

            const response = await fetch('http://localhost:3000/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                window.location.href = 'sign-in.html';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        }
    });
});








