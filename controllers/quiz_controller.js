// GET /quizes/question
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

// GET /quizes/author
exports.author = function(req,res){
    res.render('quizes/author',{nombre:'Gema Roldán', foto:'http://diegojfrancodominguez.es/proyectos/maqueta1/images/mujer.jpg', video:'https://www.youtube.com/watch?v=0Te6Rd68oo4'});
}