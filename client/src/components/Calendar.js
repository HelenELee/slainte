import React from 'react';
import { useNavigate } from "react-router-dom"; //heroku does not like assign
//FullCalendar module
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { QUERY_MAIN_CHART } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import Home from '../pages/Home';

const { enAULocale } = require('date-fns/locale/en-AU');
//use date-fns for date formatting
const { format } = require('date-fns');

const formatDate = ((date) => {
    const tempdate = new Date(`${date} 00:00:00`);
    return format(tempdate, "yyyy-MM-dd", { locale: enAULocale })
});


let newData;

function FullCalendarApp() {
    
  const navigate = useNavigate();
  const mainQuery = useQuery(QUERY_MAIN_CHART);
   
  //if event clicked open event
  const handleClickEvent = async (e) => {
      
      //direct to event with the chosen id
      if (e.event.id) {
          navigate(`/add-day/${e.event.id}`);
      }
    };

    //check if query is complete 
    if (!mainQuery.loading){
       //format data so it can be used by calendar
        if (mainQuery.data ) {
          newData = mainQuery.data.me.days.map(o => ({"id": o._id, "title": "score: " + o.score.toString() + " / rating: " + o.rating, "start": formatDate(o.date), "end": formatDate(o.date), color: (o.rating === "1" ? "red" : o.rating === "2" ? "var(--orange)": "var(--pale-green)")  })) 

       //sort data in ascending date order
        newData = newData.sort(function compare(a, b) {
            var dateA = new Date(a.start);
            var dateB = new Date(b.start);
            return dateA - dateB;
          });

        }
        
    }
  return (
    <div className="App">

            {Auth.loggedIn() ? (
                    <>
                    {mainQuery.loading ? (
                        <div>Loading...</div>
                        ) : (
                        mainQuery.data &&
                        <FullCalendar
                                height="auto"
                                // width="auto"
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                
                                customButtons={{
                                new: {
                                    text: 'new',
                                    click: () => console.log('new event'),
                                },
                                }}
                                events={newData}  
                                editable={true}                            
                                eventColor="var(--pale-green)" 
                                nowIndicator="var(--dusty-pink)"
                                dateClick={(e) => console.log(e.dateStr)}
                                eventClick={(e) => {
                                    console.log("event id", e.event.id);
                                    handleClickEvent(e)}}
                        />
                )}
                    </>
                ) : (<Home />)}

      
            
    </div>
  );
}

export default FullCalendarApp;