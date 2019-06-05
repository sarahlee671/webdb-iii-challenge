
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Sarah', cohort_id: '1'},
        {name: 'Bob', cohort_id: '2'},
        {name: 'Sandy', cohort_id: '3'},
        {name: 'Jane', cohort_id: '1'},
        {name: 'George', cohort_id: '2'},
        {name: 'Susan', cohort_id: '3'}
      ]);
    });
};
