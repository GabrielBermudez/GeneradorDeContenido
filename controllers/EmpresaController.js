var empresaModel = require('../models/EmpresaModel')

exports.action_empresa_index = function (req, res) {
    let empresa = empresaModel.FindAll()
    empresa.then(empresas=>{
      res.render('admin/empresa/index',{empresas})
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json(err)
    })
    
}

exports.action_empresa_create = function (req, res) {
    res.render('admin/empresa/create',{empresa:null});
}

exports.action_empresa_update = function (req, res) {
  let empresa = empresaModel.FindById(req.params.id)

  empresa.then(empresa =>{
    res.render('admin/empresa/update',{empresa})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
  
}

exports.action_empresa_view = function(req, res) {
  let empresa = empresaModel.FindById(req.params.id)

  empresa.then(empresa =>{
    res.render('admin/empresa/view',{empresa})
  })
  .catch(err => {
    console.log(err)
    res.estatus(500).json(err)
  })
}

exports.empresa_create = function (req, res) {
	let empresa = empresaModel.CreateEmpresa(req)

	empresa.then(() => {
        res.redirect('/admin/empresa/index')
  	})
  	.catch(err => {
      console.log(err)
      res.status(500).json(err)

  	})
}

exports.empresa_update = function (req, res) {
  let empresa = empresaModel.UpdateEmpresa(req)

  empresa.then(() =>{
    res.redirect('/admin/empresa/index')
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

exports.empresa_delete = function (req, res) {
  let empresa = empresaModel.DeleteEmpresa(req)

  empresa.then(() =>{
    res.redirect('/admin/empresa/index')
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}