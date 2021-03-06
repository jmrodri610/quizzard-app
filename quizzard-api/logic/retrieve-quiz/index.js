const { validate, errors: { NotFoundError, ContentError } } = require('quizzard-util')
const { ObjectId, models: { Quiz } } = require('quizzard-data')

module.exports = function (quizId) {

    validate.string(quizId)
    validate.string.notVoid('quizId', quizId)
    if (!ObjectId.isValid(quizId)) throw new ContentError(`${quizId} is not a valid id`)




    return (async () => {

        let quiz = await Quiz.findById(quizId).lean()

        if (!quiz) throw new NotFoundError('quiz not found')

        return quiz
          

    })()
}