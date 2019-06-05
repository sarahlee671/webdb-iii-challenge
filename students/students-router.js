
const knex = require('knex');

const router = require('express').Router();

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

router.get('/', async (req, res) => {
    try {
      const students = await db('students'); 
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const student = await db('students')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const [id] = await db('students').insert(req.body);
  
      const student = await db('students')
        .where({ id })
        .first();
  
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const count = await db('students')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const role = await db('students')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
      res.status(500).json(error)
    }
  });
  

  router.delete('/:id', async (req, res) => {
    try {
      const count = await db('students')
        .where({ id: req.params.id })
        .del();
  
      if (count > 0) {
        res.status(204).json({message: `${count} record deleted`})
      } else {
        res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
        res.status(500).json(error);
    }
  });

  module.exports = router