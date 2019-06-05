const knex = require('knex');

const router = require('express').Router();

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

router.get('/', async (req, res) => {
    try {
      const cohorts = await db('cohorts'); 
      res.status(200).json(cohorts);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(cohort);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.get('/:id/students', (req, res) => {
      const cohortStudents = req.params.id;
      db
        .from('students')
        .where({ cohort_id: `${cohortStudents}`}) 
        .then(students => {
            res.status(200).json(students)
        })
        .catch(err => {
            res.status(500).json(err)
        })
  })
  
  router.post('/', async (req, res) => {
    try {
      const [id] = await db('cohorts').insert(req.body);
  
      const cohort = await db('cohorts')
        .where({ id })
        .first();
  
      res.status(201).json(cohort);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const count = await db('cohorts')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const cohort = await db('cohorts')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: 'Cohort not found' });
      }
    } catch (error) {
        res.status(500).json(error)
    }
  });
  

  router.delete('/:id', async (req, res) => {
    try {
      const count = await db('cohorts')
        .where({ id: req.params.id })
        .del();
  
      if (count > 0) {
        res.status(200).json({message: `${count} record deleted`})
      } else {
        res.status(404).json({ message: 'Cohort not found' });
      }
    } catch (error) {
        res.status(500).json(error);
    }
  });

  module.exports = router