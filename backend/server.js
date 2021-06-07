import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/Issue';

const app = express();
const router = express.Router();
const connection = mongoose.connection;

app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

mongoose.connect('mongodb://localhost:27017/issues', {useUnifiedTopology: true, useNewUrlParser:true})
connection.once('open', () => console.log('Database connected.'))


router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
      if (err) console.log(err)
      else res.json(issues);
    });
});

router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) =>{
        if (err) console.log(err)
        else res.send(issue)
    })
})

router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
    .then(issue => {
        res.status(200).json({'issue': 'Added successfully'})
    })
    .catch(err => {
        res.status(400).send('Failed to Add')
    });
    
});

router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue) return next(new Error('could not load document'))
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save()
            .then(issue => res.status(200).send('Update successful.'))
            .catch(err => res.status(400).send('update failed'))
        }
    });
});

router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndDelete({_id: req.params.id}, (err, issue) => {
        if (err) res.json(err)
        else res.json('removed successfully.')
    })
})










app.listen(4000, () => console.log('Server started on port 4000'))