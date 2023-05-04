import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { QUERY_MAIN_CHART } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { StyledModal } from "./StyledModal"
import DayForm from "./DayForm";

const { enAULocale } = require('date-fns/locale/en-AU');
const { format } = require('date-fns');

const formatDate = ((date) => {
    const tempdate = new Date(`${date} 00:00:00`);
    return format(tempdate, "yyyy-MM-dd", { locale: enAULocale })
});
/*
const events = [
  {
    id: 1,
    title: 'event 1',
    start: '2023-05-01',
    end: '2023-05-01',
  },
  {
    id: 2,
    title: 'event 2',
    start: '2023-05-02T13:00:00',
    end: '2023-05-02T18:00:00',
  },
  { id: 3, title: 'event 3', start: '2021-06-17', end: '2021-06-20' },
];

const myEvents = [
    {id: '645320ff0d89d85a1d42dff5', title: 'score 2 rating 1', start: '2023-05-01', end: '2023-05-01'},
    {id: '645321270d89d85a1d42dff8', title: 'score 2 rating 1', start: '2023-05-02', end: '2023-05-02'},
    {id: '645321540d89d85a1d42dffc', title: 'score 3 rating 2', start: '2023-05-03', end: '2023-05-03'}
];
*/
let newData;

function FullCalendarApp() {
    
    const [showModal, setShowModal] = useState(false);
    

    const { loading, data } = useQuery(QUERY_MAIN_CHART);
  //const days = data?.me || [];
  
 // const result = days.map(o => ({"id": o._id, "title": o.score, "start": o.date, "end": o.date  }));

 const handleClickEvent = (e) => {
    //const { name, value } = event.target;
    if (e.event.id) {
        setShowModal(true);
    }
    
  };

    if (!loading){
        newData = data.me.days.map(o => ({"id": o._id, "title": "score: " + o.score.toString() + "/rating: " + o.rating, "start": formatDate(o.date), "end": formatDate(o.date)  })) 
        console.log("newData", newData);
    }
  return (
    <div className="App">

            {Auth.loggedIn() ? (
                    <>
                    {loading ? (
                        <div>Loading...</div>
                        ) : (
                        data &&
                        <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                headerToolbar={{
                                center: 'dayGridMonth,timeGridWeek,timeGridDay new',
                                }}
                                customButtons={{
                                new: {
                                    text: 'new',
                                    click: () => console.log('new event'),
                                },
                                }}
                                events={newData}
                                eventColor="red"
                                nowIndicator
                                dateClick={(e) => console.log(e.dateStr)}
                                eventClick={(e) => {
                                    console.log(e.event.id);
                                    handleClickEvent(e)}}
                        />
                )}
                    </>
                ) : ("")}

      
            <StyledModal
                  show={showModal}
                  handleClose={() => setShowModal(false)}>
                 <DayForm />
                                
                 Model!!!!
            </StyledModal> 
    </div>
  );
}

export default FullCalendarApp;