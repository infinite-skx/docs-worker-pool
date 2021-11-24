import { JobHandler } from "./jobHandler";
import { IConfig } from "config";
import { IJob } from "../entities/job";
import { JobRepository } from "../repositories/jobRepository";
import { ICDNConnector } from "../services/cdn";
import { CommandExecutorResponse, IJobCommandExecutor } from "../services/commandExecutor";
import { IFileSystemServices } from "../services/fileServices";
import { IJobRepoLogger } from "../services/logger";
import { IRepoConnector } from "../services/repo";
import { IJobValidator } from "./jobValidator";

// Should also write an independent manifest job starter (e.g. not coupled with production deploy)
export class SearchManifestJobHandler extends JobHandler {
    constructor(job: IJob, config: IConfig, jobRepository: JobRepository, fileSystemServices: IFileSystemServices, commandExecutor: IJobCommandExecutor,
        cdnConnector: ICDNConnector, repoConnector: IRepoConnector, logger: IJobRepoLogger, validator:IJobValidator) {
        super(job, config, jobRepository, fileSystemServices, commandExecutor, cdnConnector, repoConnector, logger, validator);
        this.name = "SearchManifest";
    }

    prepDeployCommands(): void {
        // Could call snooty build here if necessary, though would like to avoid the overhead
        this.currJob.deployCommands = [
            '. /venv/bin/activate',
            `cd repos/${this.currJob.payload.repoName}`,
            `echo searchManifest prepDeployCommands()`,
        ];
    }

    prepStageSpecificNextGenCommands(): void {
    }

    async deploy(): Promise<any> {
    }
}