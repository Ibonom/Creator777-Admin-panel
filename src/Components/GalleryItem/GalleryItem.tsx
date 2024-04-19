import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { ImageAttributes } from '../../Models/Api/image.model';
import LinkButton from '../LinkButton/LinkButton';
import useFetch from '../../Services/Hooks/useFetch';

export default function GalleryItem({
  image,
  onDelete,
}: {
  image: ImageAttributes;
  onDelete: (id: string) => void;
}) {
  const { apiHandler } = useFetch();
  const deletImage = () => {
    apiHandler({
      method: 'delete',
      url: `image/${image.id}`,
    }).then(() => {
      onDelete(image.id);
    });
  };
  return (
    <Card>
      <CardMedia
        component="img"
        alt={`${process.env.REACT_APP_BASE_API_URL}/image/${image.original_name}`}
        height="140"
        width="140"
        image={`${process.env.REACT_APP_BASE_API_URL}/image/${image.id}`}
      />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          {image.original_name}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <LinkButton
          component={Link}
          to={`${process.env.REACT_APP_BASE_API_URL}/image/${image.id}`}
          target="_blank"
          buttonText="link"
          rel="noopener"
        />
        <Button size="small" onClick={deletImage}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}