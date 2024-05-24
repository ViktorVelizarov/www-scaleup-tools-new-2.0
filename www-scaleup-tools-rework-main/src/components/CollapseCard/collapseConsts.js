import { BsFillEnvelopeFill, BsPencilSquare } from 'react-icons/bs';
import { FaPhone, FaComments } from 'react-icons/fa';

export const collapseCardInfo = [
  {
    src: <BsFillEnvelopeFill size={30} />,
    title: '1. Application',
    par: 'Application and CV are sent through the application system. Once we review the application if it’s matching our profile expectations you’ll get an invitation to a questionnaire.',
  },
  {
    src: <FaPhone size={30} />,
    title: '2. Screening call',
    par: 'The screening call is scheduled by the candidate at the preferred time. This serves very well to get to know one of your potential team mates and get to know each other on the video-call.',
  },
  {
    src: <BsPencilSquare size={30} />,
    title: '3. Case study',
    par: 'The case study is a quite challenging part of the recruitment, but it also has a very good learning part included. It takes between 2-24 hours to complete and covers usually very complex topics.',
  },
  {
    src: <FaComments size={30} />,
    title: '4. Interview',
    par: 'Once you get here - you’ll talk to one of our senior fellows. This is a great chance to have an informal chat with our founders and go through any last questions. Ideally this ends by receiving an offer.',
  },
];
