import React from 'react';
import { useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { QUERY_MAIN_CHART } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
//import { StyledModal } from "./StyledModal"
//import DayForm from "./DayForm";

const { enAULocale } = require('date-fns/locale/en-AU');
const { format } = require('date-fns');

const formatDate = ((date) => {
    const tempdate = new Date(`${date} 00:00:00`);
    return format(tempdate, "yyyy-MM-dd", { locale: enAULocale })
});


let newData;

function FullCalendarApp() {
    
    //const [showModal, setShowModal] = useState(false);
    
    const navigate = useNavigate();
    //const { loading, data } = useQuery(QUERY_MAIN_CHART);
  const mainQuery = useQuery(QUERY_MAIN_CHART);
   
 const handleClickEvent = async (e) => {
    //const { name, value } = event.target;
    //const getDay = useQuery(GET_DAY);
    
    console.log(e.event.id);
    if (e.event.id) {
      
        //setShowModal(true);
        console.log("OPENING DAY ", e.event.id);
        //window.location.assign(`/add-day/${e.event.id}`);
        navigate(`/add-day/${e.event.id}`);
    }
    
  };

    if (!mainQuery.loading){
        console.log("not loading anymore");
        if (mainQuery.data ) {
          newData = mainQuery.data.me.days.map(o => ({"id": o._id, "title": "score: " + o.score.toString() + "/rating: " + o.rating, "start": formatDate(o.date), "end": formatDate(o.date)  })) 
       //console.log("newData", newData);
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
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                
                                customButtons={{
                                new: {
                                    text: 'new',
                                    click: () => console.log('new event'),
                                },
                                }}
                                events={newData}
                                eventColor="var(--pale-green)"
                                nowIndicator="var(--dusty-pink)"
                                dateClick={(e) => console.log(e.dateStr)}
                                eventClick={(e) => {
                                    console.log("event id", e.event.id);
                                    handleClickEvent(e)}}
                        />
                )}
                    </>
                ) : ("<Home />")}

      
            
    </div>
  );
}

export default FullCalendarApp;