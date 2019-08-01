const express = require('express');
const router = express.Router();

const formDB = require('../models/form-model.js');

////////Fetching all volunteers//////
router.get('/', (req, res) => {
  formDB
    .find(req.query)
    .then(volunteers => {
      res.status(200).json(volunteers);
    })
    .catch(error => {
      // console.log(error);
      res.status(500).json({ error: 'Error retrieving the volunteers data' });
    });
});

///////////Fetching a volunteer by email address/////////////
router.get('/findbyemail', (req, res) => {
  const { email } = req.body;

  formDB
    .findByEmail(email)
    .then(volunteer => {
      res.status(200).json(volunteer);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the volunteer data' });
    });
});

//////////Fetching volunteers by phone number//////////
router.get('/findbyphone', (req, res) => {
  const { phone } = req.body;

  formDB
    .findByPhone(phone)
    .then(volunteer => {
      res.status(200).json(volunteer);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the volunteer data' });
    });
});

//////////Fetching  volunteers by Full name////////////////
router.get('/findbyname', (req, res) => {
  const { fname, lname } = req.body;

  formDB
    .findByName(fname, lname)
    .then(volunteer => {
      res.status(200).json(volunteer);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the volunteer data' });
    });
});

//////////Fetching volunteers by city////////////////
router.get('/findbycity', (req, res) => {
  const { city, state, country } = req.body;

  formDB
    .findByCity(city, state, country)
    .then(volunteers => {
      res.status(200).json(volunteers);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the volunteers data' });
    });
});

/////////Fetching volunteers by state//////////////
router.get('/findbystate', (req, res) => {
  const { state } = req.body;

  formDB
    .findByState(state)
    .then(volunteers => {
      res.status(200).json(volunteers);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the volunteers data' });
    });
});

///////// Fetchng volunteeers by country/////////////
router.get('/findbycountry', (req, res) => {
  const { country } = req.body;

  formDB
    .findByCountry(country)
    .then(volunteers => {
      res.status(200).json(volunteers);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the volunteers data' });
    });
});

////////// addding a new volunteer  /////////////

router.post('/', (req, res) => {
  const { newVolunteer, newInterests } = req.body;
  formDB
    .addVolunteer(newVolunteer)
    .then(volunteerId => {
      return volunteerId[0];
    })
    .then(id => {
      newInterests.volunteersid = id;

      formDB.addInterests(newInterests);
      res.sendStatus(201);
    })
    .catch(error => {
      res.status(500).json({ error: ' Error adding the volunteer' });
    });
});

///////// deleting volunteer by id ///////////////

router.delete('/:id', async (req, res) => {
  try {
    const count = await formDB.deleteInterests(req.params.id);
    const count2 = await formDB.deleteVolunteer(req.params.id);

    if (count2 > 0 && count > 0) {
      res.status(200).json({ message: 'The volunteer has been removed' });
    } else {
      res.status(404).json({ message: 'The volunteer could not be found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error removing the hub'
    });
  }
});

module.exports = router;
