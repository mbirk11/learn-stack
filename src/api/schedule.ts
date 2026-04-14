import client from "./client";
import type { SessionType, TimeSlot, WeeklySchedule } from "./enrollment";

export async function getWeeklySchedules(
  courseId: number,
): Promise<WeeklySchedule[]> {
  const response = await client.get(`/courses/${courseId}/weekly-schedules`);
  return response.data.data;
}

export async function getTimeSlots(
  courseId: number,
  weeklyScheduleId: number,
): Promise<TimeSlot[]> {
  const response = await client.get(`/courses/${courseId}/time-slots`, {
    params: {
      weekly_schedule_id: weeklyScheduleId,
    },
  });

  return response.data.data;
}

export async function getSessionTypes(
  courseId: number,
  weeklyScheduleId: number,
  timeSlotId: number,
): Promise<SessionType[]> {
  const response = await client.get(`/courses/${courseId}/session-types`, {
    params: {
      weekly_schedule_id: weeklyScheduleId,
      time_slot_id: timeSlotId,
    },
  });

  return response.data.data;
}
