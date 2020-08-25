
const fileHelper = require('./fileHelper');

const filterProjects = async function(projectCode) {
    let projects = JSON.parse(await fileHelper.readFile('projects.json'));
    let branches = JSON.parse(await fileHelper.readFile('projectBranches.json'));
    let projData = projects.filter(function(a) {
        if (a.code == projectCode) {
            let branch = branches.filter(function(b) {
                if (b.code == projectCode) {
                    return b;
                }
            });
            a.branches = branch[0].branches;
            return a;
        }
    });
    return projData
}

const filterBranches = async function(branchCode) {
    let projects = JSON.parse(await fileHelper.readFile('projects.json'));
    let branches = JSON.parse(await fileHelper.readFile('projectBranches.json'));
    let branchData = branches.filter(function(a) {
        if (a.branches.includes(branchCode)) {
            let project = projects.filter(function(b) {
                if (b.code == a.code) {
                    return b;
                }
            });
            a.name = project[0].name;
            return a;
        }
    });
    return branchData;
}

module.exports = {
    filterProjects,
    filterBranches
}