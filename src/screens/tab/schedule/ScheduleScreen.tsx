import React, { Dispatch, Key, SetStateAction, useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, Button, TouchableOpacity, FlatList } from 'react-native';
import { AppStackPageProps, appStackNavigate } from '../../../navigation/navigators/StackNavigator';
import { useSelector } from 'react-redux';
import { black, coral, grey, opacity, white, ButtonBackground, } from '../../../utilities/colors';
// import { joinCourseChat } from '../../../firebaseReduxUtilities/useChatData';
// import { addCourses, joinCourse, leaveCourse, loadCoursesData } from '../../../firebaseReduxUtilities/useCourseData';
import { FontAwesome } from '@expo/vector-icons';
import { scale, standardMargin } from '../../../utilities/scale';
import Header from '../../../components/header/Header';
import { CompositeScreenProps } from '@react-navigation/native';
import { TabPageProps } from '../../../navigation/navigators/TabNavigator';
import { courses } from '../../../redux/dummyData';
import { Calendar } from 'react-native-big-calendar'
import { styles } from './ScheduleScreenStyles';
// import { current } from '@reduxjs/toolkit';

// import { avenirBlackCentered } from '../../../utilities/textfont';
// import { buttonFont, NameFont, EmailFont } from '../../../utilities/textfont';
// import { withTokens } from '../../../firebaseReduxUtilities/tokens';

export type ScheduleScreenProps = EmptyProps;

// workaround for navigating from tab page to app stack page - not sure if this actually works
type SchedulePageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'schedule'>
>;

export default function ScheduleScreen({ route, navigation }: SchedulePageProps) {
  const coursemap = useSelector((state: ReduxState) => state.data.coursemap);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<string>('');
  const [showCourses, setShowCourses] = useState<boolean>(true);
  var today = new Date();
  var current_day = new Date().getDay();

  function splitTime(time: string) {
    const parts = time.split(':');
    return [parseInt(parts[0]), parseInt(parts[1])];
  };
  function weekDayToNum(daysString: string) {
    const daysMap = {
      'S': 0,  // Sunday
      'M': 1,  // Monday
      'T': 2,  // Tuesday
      'W': 3,  // Wednesday
      'R': 4,  // Thursday
      'F': 5,  // Friday
      'U': 6   // Saturday
    };

    const dayNumbers = daysString.split('').map(day => daysMap[day]);

    return dayNumbers;
  }

  // const hr = splitTime('10:19')[0];
  // const min = splitTime('10:19')[1];
  // console.log("testing", hr);
  // console.log("testing", min);

  // console.log('userCourses', userCourses);

  // function extractCourseInfo(userCourses: string[]) {
  //   return userCoursemap[userCourses[0]]?.courseId;
  // }
  // console.log('testing extractCourseInfo', extractCourseInfo(userCourses));

  function extractCourseInfo1() {
    return Object.keys(coursemap).map((courseId: string) => {
      const course = coursemap[courseId];
      if (!course || !course.timeLocations || course.timeLocations.length === 0) {
        return null; // here to filter out null values
      }

      const { beginTime, buildingRoom, days, endTime, instructors } = course.timeLocations[0];
      return {
        uid: courseId,
        courseId: course.courseId,
        courseTitle: course.courseTitle,
        beginTime,
        buildingRoom,
        days,
        endTime,
        // instructors
      };
    }).filter(courseInfo => courseInfo !== null); // here to filter out null values
  }

  const extractCoursesInfo = extractCourseInfo1();
  console.log('extractCoursesInfo: \n', extractCoursesInfo);

  // console.log('testing', extractCoursesInfo[0]?.beginTime);

  function generateTestingEvents2(extractCoursesInfo: any) {

  }
  // const testingEvents2 = generateTestingEvents2(extractCoursesInfo);

  console.log('extractCoursesInfo: \n', extractCoursesInfo[0]);
  function generateEventFromCourse(extractCoursesInfo: any) {

    if (!extractCoursesInfo) {
      return []; // Return an empty array if no courses are available
    }

    const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF3366', '#33FFFF'];
    const eventColor = colors[Math.floor(Math.random() * colors.length)]; // Assign a random color

    const uid = extractCoursesInfo?.uid;
    const beginTime = extractCoursesInfo?.beginTime;
    // console.log('beginTime', beginTime);
    const buildingRoom = extractCoursesInfo?.buildingRoom;
    // console.log('buildingRoom', buildingRoom);
    const courseid = extractCoursesInfo?.courseId;
    // console.log('courseid', courseid);
    const courseTitle = extractCoursesInfo?.courseTitle;
    // console.log('courseTitle', courseTitle);
    const days = extractCoursesInfo?.days;
    // console.log('days', days);
    const endTime = extractCoursesInfo?.endTime;
    // console.log('endTime', endTime);

    const CourseBeginHours = splitTime(beginTime);
    console.log('CourseBeginHours', CourseBeginHours);
    const CourseEndHours = splitTime(endTime);
    console.log('CourseEndHours', CourseEndHours);
    const CourseWeekDay = weekDayToNum(days);
    console.log('CourseWeekDay', CourseWeekDay);

    const testingEvents: any[] = [];
    for (let i = 0; i < CourseWeekDay.length; i++) {
      const course_day = CourseWeekDay[i];
      const interval = current_day - course_day;
      const courseDate = new Date(today.getTime() - (interval * 24 * 60 * 60 * 1000));
      const year = courseDate.getFullYear();
      const month = courseDate.getMonth();
      const date = courseDate.getDate();
      testingEvents.push({
        title: courseid + ' - ' + courseTitle,
        start: new Date(year, month, date, CourseBeginHours[0], CourseBeginHours[1]),
        end: new Date(year, month, date, CourseEndHours[0], CourseEndHours[1]),
        eventColor: eventColor, // Assign the event color
        uid: uid,
      });
    }

    return testingEvents;

  }
  const testingEvents = generateEventFromCourse(extractCoursesInfo[0]);
  const extractCoursesLength = extractCoursesInfo.length;
  console.log('extractCoursesLength', extractCoursesLength);
  const combinedEvents = [];
  for (let i = 0; i < extractCoursesLength; i++) {
    const eventsForCourse = generateEventFromCourse(extractCoursesInfo[i]);
    combinedEvents.push(...eventsForCourse); // Spread the events into the combinedEvents array
  }

  combinedEvents.sort(function (a, b) {
    return a.start - b.start;
  });


  console.log('combinedEvents', combinedEvents);

  // const testingEvents = [
  //   {
  //     title: 'Meeting1',
  //     start: new Date(2023, 11, 7, 15, 45),
  //     end: new Date(2023, 11, 7, 17, 30),
  //   },
  //   {
  //     title: 'Meeting2',
  //     start: new Date(2023, 11, 8, 15, 45),
  //     end: new Date(2023, 11, 8, 16, 30),
  //   },
  // ];

  // end of calendar dummy data for testing
  const openCourseModal = (id: string) => {
    setModalData(id);
    setModalVisible(true);
  };

  const convertTime = (time: string | undefined) => {
    if (!time) return '';
    let hours_24 = parseInt(time.slice(0, 2));
    let suffix = hours_24 <= 12 ? 'AM' : 'PM';
    let hours_12 = (((hours_24 + 11) % 12) + 1).toString();
    return `${hours_12 + time.slice(2)} ${suffix}`;
  };

  type CourseInfoModalProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    modalData: string;
  };
  function renderItem({ item: courseId, index }: { item: string; index: number }) {
    const course: Course = coursemap[courseId];
    const title = `${course?.courseId?.replaceAll(/\s+/g, ' ').trim()} - ${course?.courseTitle}`;
    const timeLocation = course?.timeLocations?.find(
      timeloc => timeloc?.instructionTypeCode === 'LEC',
    );
    const instructors = timeLocation?.instructors[0];
    return (
      <Pressable
        key={index}
        style={styles.courseBlock}
        onPress={() => openCourseModal(courseId)}>
        <Text
          style={styles.eachCourseTitle}>
          {title}
        </Text>
        <Text style={styles.courseText}>
          {timeLocation?.days.replaceAll(/\s+/g, ' ').trim()}
          - {convertTime(timeLocation?.beginTime)}
          to {convertTime(timeLocation?.endTime)}
        </Text>
        <Text style={styles.courseText}>{timeLocation?.buildingRoom}</Text>
        <Text style={styles.courseText}>{instructors?.name}</Text>
      </Pressable>
    );
  }

  function CourseInfoModal({ isOpen, setIsOpen, modalData }: CourseInfoModalProps) {
    function generateCourseModal(courseId: string) {
      const course = coursemap[courseId];
      const title = `${course?.courseId.replaceAll(/\s+/g, ' ').trim()}`;
      const timeLocation = course?.timeLocations?.find(
        timeloc => timeloc?.instructionTypeCode === 'LEC',
      );
      const instructors = timeLocation?.instructors[0];
      return (
        <View>
          <Text style={styles.eachCourseInfoTitle}>
            {title}
          </Text>
          <Text style={styles.courseText}>
            {timeLocation?.days.replaceAll(/\s+/g, ' ').trim()} -{' '}
            {convertTime(timeLocation?.beginTime)} to{' '}
            {convertTime(timeLocation?.endTime)}
          </Text>
          <Text style={styles.courseText}>{timeLocation?.buildingRoom}</Text>
          <Text style={styles.courseText}>{instructors?.name}</Text>
        </View>
      );
    }
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}>
        <View
          style={styles.eachCourseInfoPosition}>
          <View
            style={styles.eachCourseInfoWindow}>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <FontAwesome
                name="close"
                size={scale(24)}
                color={coral}
                style={{ alignSelf: 'flex-end' }}
              />
            </TouchableOpacity>
            {generateCourseModal(modalData)}
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: white }}>
      <Header centerElement={'Your Courses'} />
      <View style={{ flex: 1, width: '100%', backgroundColor: white }}>

        {/* Toggle Button */}
        <Pressable
          style={styles.toggleAndManageButton}
          onPress={() => setShowCourses(!showCourses)}>
          <Text style={styles.toggleAndManageButtonText}>
            {showCourses ? "Show Calendar" : "Show Courses"}
          </Text>
        </Pressable>

        {/* Conditional Rendering of FlatList or Calendar */}
        {Object.keys(coursemap).length === 0 ? (
          <Text style={styles.notEnrolledText}>
            You are not enrolled in any courses
          </Text>
        ) : showCourses ? (
          <FlatList
            style={{}}
            contentContainerStyle={styles.courseFlatListStyle}
            data={Object.keys(coursemap)}
            renderItem={renderItem}
            bounces={false}
          />
        ) : (
          <Calendar
            // only show weekdays
            mode='custom'
            weekStartsOn={1}
            weekEndsOn={5}
            events={combinedEvents}
            ampm={true}
            height={600}
            onPressEvent={(event: any) => openCourseModal(event.uid)}
            overlapOffset={0}
            swipeEnabled={false}
            // showTime={false}
            // eventCellStyle={{ backgroundColor: coral }}
            scrollOffsetMinutes={300}
          />
        )}

      </View>

      <CourseInfoModal
        isOpen={modalVisible}
        setIsOpen={setModalVisible}
        modalData={modalData}
      />

      <Pressable style={styles.toggleAndManageButton}
        onPress={() => appStackNavigate(navigation, 'joinCourses', { id: 'joinCourses' })}
      >
        <Text style={styles.toggleAndManageButtonText}>
          Manage Courses
        </Text>
      </Pressable>
    </View>
  );
}
