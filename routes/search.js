const express = require('express');
const router = express.Router();
const filterDataHelper = require('../helpers/filterDataHelper');

// @route   GET search/project/:projectCode
// @desc    Search by Project
// @access  Public
router.get('/project/:projectCode', async(req, res) => {
    try {
        res.send(await filterDataHelper.filterProjects(req.params.projectCode));
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET search/branch/:branchCode
// @desc    Search by Branch
// @access  Public
router.get('/branch/:branchCode', async(req, res) => {
    try {
        res.send(await filterDataHelper.filterBranches(req.params.branchCode));
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;