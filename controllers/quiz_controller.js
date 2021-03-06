// GET /quizes/question
/* Comentado mod 7
exports.question = function(req,res) {
	res.render('quizes/question',{pregunta:'Capital de Italia'});
};

// GET /quizes/answer
exports.answer = function(req,res) {
	if(req.query.respuesta === 'Roma') {
		res.render('quizes/answer',{respuesta:'Correcto'});
	} else {
		res.render('quizes/answer',{respuesta:'Incorrecto'});
	}
};
*/
// Add mod7
var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye: :quizId
exports.load = function(req,res,next,quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if(quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId='+quizId));
			}
		}
	).catch(function(error) { next(error); } );
}


// GET /quizes
exports.index = function(req,res) {
	var search_quiz = "%", search = "";
	if (req.query.search != undefined){
		search = req.query.search;
		search_quiz = '%' + search.replace(' ', '%') +'%';
	}
	models.Quiz.findAll({where: ["pregunta like ?", search_quiz]}).then(function(quizes){
		res.render('quizes/index.ejs', { quizes: quizes, search: search, errors: []} );
	}).catch(function(error) { next(error); });
}

// GET /quizes/:id
exports.show = function(req,res) {
	res.render('quizes/show', { quiz: req.quiz, errors: [] });
}

// GET /quizes/:id/answer
exports.answer = function(req,res) {
	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado, errors: []});
}

// GET /quizes/new
exports.new =  function(req,res) {
	var quiz = models.Quiz.build( // crea objeto quiz
		{ pregunta: "Pregunta", respuesta: "Respuesta", tema: "otro" }
	);
	res.render('quizes/new', { quiz:quiz, errors: [] });
}

// POST /quizes/create
exports.create = function(req,res) {
	var quiz = models.Quiz.build( req.body.quiz );
	
	quiz
	.validate()
	.then(
		function(err){
			if(err) {
				res.render('quizes/new', { quiz: quiz, errors: err.errors });
			} else {
				quiz	// save: guarda en DB los campos pregunta y respuesta de quiz
				.save({fields: ["pregunta","respuesta","tema"]})
				.then(function(){
					res.redirect('/quizes');
				})	// redirección HTTP (URL relativo) lista de preguntas
			}
		}
	);
}


// GET /quizes/edit
exports.edit = function(req,res) {
	var quiz = req.quiz;	// autoload de instancia de quiz
	res.render('quizes/edit',{ quiz: quiz, errors: [] });
}

// PUT /quizes/:id
exports.update = function(req,res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;
	
	req.quiz
	.validate()
	.then(
		function(err){
			if(err) {
				res.render('quizes/edit', { quiz: req.quiz, errors: err.errors });
			} else {
				req.quiz	// save: guarda en DB los campos pregunta y respuesta de quiz
				.save({fields: ["pregunta","respuesta","tema"]})
				.then(function(){
					res.redirect('/quizes');
				})	// redirección HTTP (URL relativo) lista de preguntas
			}
		}
	);
}

// DELETE /quizes/:id
exports.destroy = function(req,res) {
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error);});
}

// GET /quizes/author
exports.author = function(req,res){
    res.render('quizes/author',{nombre:'Gema Roldán', foto:'http://diegojfrancodominguez.es/proyectos/maqueta1/images/mujer.jpg', video:'https://www.youtube.com/watch?v=0Te6Rd68oo4', errors:[]} );
}

