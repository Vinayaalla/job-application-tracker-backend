const jobRepository = require("../repositories/jobs.repository");

exports.getJobs = async (userId) => {
    return await jobRepository.findByUserId(userId);
};

exports.createJob = async (userId, data) => {
    const { company, role, status, created_at } = data;

    const result = await jobRepository.createJob({
        company,
        role,
        status,
        created_at,
        user_id: userId
    });

    return {
        message: "Job added successfully",
        jobId: result.insertId
    };
};

exports.updateJob = async (jobId, userId, data) => {
    const { company, role, status } = data;

    const result = await jobRepository.updateJob(
        jobId,
        userId,
        { company, role, status }
    );

    if (result.affectedRows === 0) {
        throw new Error("Job not found or unauthorized");
    }

    return { message: "Job updated successfully" };
};

exports.deleteJob = async (jobId, userId) => {
    const result = await jobRepository.deleteJob(jobId, userId);

    if (result.affectedRows === 0) {
        throw new Error("Job not found or unauthorized");
    }

    return { message: "Job deleted successfully" };
};