// Helper function to convert total seconds to the duration format
function convertSecondsToDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor((totalSeconds % 3600) % 60)
  
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
}

export const getDuration = (courseDetails)=>{
    //find total duration of course
    // console.log(courseDetails);
    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
        })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    return totalDuration;
}

export default convertSecondsToDuration;