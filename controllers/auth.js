const register = async (req, res) => {
    res.send('You just created an account1')
}

const login = async (req, res) => {
    res.send('You just been loged in')
}

module.exports = {
    register,
    login
}