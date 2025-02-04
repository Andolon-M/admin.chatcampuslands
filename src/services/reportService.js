import axios from 'axios';
import { endpoints } from './apiConfig';

const getHeaders = () => {
  const token = localStorage.getItem("token"); // Cambiado de "authToken" a "token"
  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const fetchReportDataIza = async (startDate, endDate) => {
  try {
    const params = { start: startDate, end: endDate };
    const headers = getHeaders();


    const [usersResponse, messagesResponse] = await Promise.all([
      axios.get(endpoints.usersToday, { params, headers }),
      axios.get(endpoints.messagesToday, { params, headers })
    ]);
    console.log('data encontrada sin normalizar ', usersResponse.data, messagesResponse.data);
    
    const dataNormalized = normalizeDataIza(usersResponse.data, messagesResponse.data)
    console.log('data normalizada ',dataNormalized);
    
    return dataNormalized

  } catch (error) {
    throw error;
  }
};

export const fetchReportDataCampus = async (startDate, endDate) => {
  try {
    console.log('bu');
    
    if (!startDate) startDate = new Date().toISOString().split('T')[0]
    if (!endDate) endDate = new Date().toISOString().split('T')[0]

    const params = { startDate: startDate, endDate: endDate };
    const headers = getHeaders();



    const [userCampusBogota, userCampusBucaramanga] = await Promise.all([
      axios.get(endpoints.usersCampusBogota, { params, headers }),
      axios.get(endpoints.usersCampusBucaramanga, { params, headers })
    ]);
    console.log(userCampusBogota.data, userCampusBucaramanga.data);
    
    return {
      usersBogota: userCampusBogota.data,
      usersBucaramanga: userCampusBucaramanga.data    
    };

  } catch (error) {

    return "hubo un error conteniendo la data de campus ", error;
  }
};

const normalizeDataIza = (usersData, messagesData) => {
  const normalizedData = {};
  const normalizePhoneNumber = (phone) => {
    if (!phone) return phone;
    const phoneStr = phone.toString();
    return phoneStr.startsWith('57') ? parseInt(phoneStr.slice(2)) : parseInt(phoneStr);
  };

  const normalizeCity = (city) => {
    if (!city) return null;
    const cityStr = city.toString();
    const normalized = cityStr
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/^\w/, c => c.toUpperCase());
    return normalized === 'Bogota' ? 'Bogota' : normalized;
  };

  const messagesByUserId = messagesData.reduce((acc, message) => {
    if (!acc[message.userId]) acc[message.userId] = [];
    acc[message.userId].push({
      Message: message.content,
      MessageId: message.messageId,
      Time: message.messageTime,
    });
    return acc;
  }, {});

  usersData.forEach(user => {
    const normalizedCity = normalizeCity(user.city);
    // Solo procesar usuarios con ciudad válida
    if (normalizedCity) {
      const userId = user.id;
      const phoneNumber = normalizePhoneNumber(user.phone);
      const validMessages = (messagesByUserId[userId] || []).filter(
        message => message.messageId !== phoneNumber && message.content !== user.username
      );

      normalizedData[userId] = {
        UserId: userId,
        Username: user.username.trim(),
        PhoneNumber: phoneNumber,
        Age: user.age,
        Availability: user.availability,
        ContactWay: user.contact_way,
        Messages: validMessages,
        city: normalizedCity,
        messageCount: validMessages.length
      };
    }
  });

  return Object.values(normalizedData);
};
