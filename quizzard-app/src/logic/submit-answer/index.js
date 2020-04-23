import call from '../../utils/call'
const { validate, errors: { NotFoundError, CredentialsError } } = require('quizzard-util')
const API_URL = process.env.REACT_APP_API_URL

//module.exports = function (playerId, quizId, answers) {
export default function (playerId, quizId, answers) {
    validate.string(playerId)
    validate.string.notVoid('playerId', playerId)
    
    validate.string(quizId)
    validate.string.notVoid('quizId', quizId)
    return (async () => {
        
        const res = await call(`${API_URL}/play/submit-answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quizId, playerId, answers })
        })

        if (res.status === 200) {

            return 

        }

        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}