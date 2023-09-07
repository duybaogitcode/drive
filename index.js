import axios from 'axios';
import express from 'express';
import queryString from 'query-string';
import cors from 'cors';

app.use(
  cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

const app = express();

app.get('/getvideoinfo', async (req, res) => {
  const videoInfoUrl = req.query.url;

  try {
    const queryStringDrive = await axios.get(videoInfoUrl);

    const parsedQuery = queryString.parse(queryStringDrive.data);

    const ipv4Address = '111.90.141.34';
    const ipv6Address = '2405:4802:9017:c3c0:e543:2ca8:63b1:23a2';
    const formats = parsedQuery.fmt_stream_map.split(',');
    const ipv4Links = [];
    const ipv6Links = [];

    formats.forEach((formatInfo) => {
      const match = formatInfo.match(/(\d+)\|(.+)/);
      if (match) {
        const formatId = match[1];
        const videoUrl = match[2];
        const ipv4Link = videoUrl.replace(
          'ip=2405:4802:9017:c3c0:e543:2ca8:63b1:23a2',
          `ip=${ipv4Address}`
        );
        const ipv6Link = videoUrl.replace(
          'ip=2405:4802:9017:c3c0:e543:2ca8:63b1:23a2',
          `ip=${ipv6Address}`
        );
        ipv4Links.push({ formatId, link: ipv4Link });
        ipv6Links.push({ formatId, link: ipv6Link });
      }
    });

    // In ra các liên kết cho IPv4
    console.log('Liên kết cho IPv4:');
    ipv4Links.forEach(({ formatId, link }) => {
      console.log(`Format ID ${formatId}: ${link}`);
    });

    // In ra các liên kết cho IPv6
    console.log('\nLiên kết cho IPv6:');
    ipv6Links.forEach(({ formatId, link }) => {
      console.log(`Format ID ${formatId}: ${link}`);
    });

    res.send(ipv6Links);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

app.get('/', (req, res) => {
  res.send('test');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
