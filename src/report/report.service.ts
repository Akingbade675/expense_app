import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from 'src/dtos/report.dto';

@Injectable()
export class ReportService {
  getAllReport(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => type === report.type)
      .find((report) => report.id === id);

    return new ReportResponseDto(report);
  }

  createReport(type: ReportType, { source, amount }): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type,
    };

    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(type: ReportType, id: string, body): ReportResponseDto {
    const reportToUpdate = data.report
      .filter((report) => type === report.type)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...reportToUpdate,
      ...body,
      updated_at: new Date(),
    };
    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(type: ReportType, id: string) {
    const reportToDelete = data.report
      .filter((report) => type === report.type)
      .find((report) => report.id === id);

    if (!reportToDelete) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToDelete.id,
    );

    delete data.report[reportIndex];

    return;
  }
}
