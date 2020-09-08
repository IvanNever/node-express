const keys = require('../keys')

module.exports =  function(email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Restoring access to your account',
        html: `
            <h1>Have you fogot your password?</h1>
            <p>If not, ignore this letter </p>
            <p>Otherwise follow the link:</p>
            <a href="${keys.BASE_URL}/auth/password/${token}">Restoring access</a>
            <hr/>
            <a href="${keys.BASE_URL}">Go to store</a>
        `
    }
}