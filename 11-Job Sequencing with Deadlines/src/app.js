// 
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item)
}
jobs = [
    { job: "j3", profit: 10, deadline: 1 },
    { job: "j1", profit: 20, deadline: 2 },
    { job: "j5", profit: 1, deadline: 3 },
    { job: "j2", profit: 15, deadline: 2 },
    { job: "j4", profit: 5, deadline: 3 },
]



class JobSequencing {
    constructor(jobs) {
        this.jobs = jobs;
        this.deadlineTable = [];
    }

    sortJobsBasedOnProfit() {
        this.jobs.sort((a, b) => {
            if (a.profit < b.profit) { return 1 };
            if (a.profit > b.profit) { return -1 };
            return 0;
        })
    }
    createDeadlineTable() {
        let max = Math.max(...this.jobs.map(e => { return e.deadline }));
        this.deadlineTable = [...Array(max)];
    }
    execute() {
        let currentJob;
        let profit = 0;
        let addedFlag = false;

        for (let i = 0; i < this.jobs.length; i++) {
            currentJob = this.jobs[i];
            // get value of deadline
            // push current job in deadlineTable based on deadlineValue
            if (this.deadlineTable[currentJob.deadline - 1] == undefined) {
                this.deadlineTable[currentJob.deadline - 1] = currentJob.job;
                addedFlag = true;
            }
            else {
                // check previous index
                if (this.deadlineTable[currentJob.deadline - 2] == undefined && (Math.sign(currentJob.deadline - 2) === 1 || Math.sign(currentJob.deadline - 2) === 0)) {
                    this.deadlineTable[currentJob.deadline - 2] = currentJob.job;
                    addedFlag = true;
                }
            }
            if (addedFlag) {
                addedFlag = false;
                profit += currentJob.profit;
            }
        }
        return {
            excutedJobs: this.deadlineTable,
            totalProfit: profit
        }
    }
} 

// init

jobSeq = new JobSequencing(jobs);
jobSeq.sortJobsBasedOnProfit();
jobSeq.createDeadlineTable();
let result = jobSeq.execute();

console.log("========================== LIST OF JOBS ==========================")
console.log(jobs)


console.log("========================== EXECUTED JOBS ==========================")
console.log(result.excutedJobs)

console.log("========================== TOTAL PROFIT ==========================")
console.log(result.totalProfit)
