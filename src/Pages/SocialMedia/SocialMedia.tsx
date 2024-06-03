import { DropResult } from 'react-beautiful-dnd';
import { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import _ from 'lodash';
import DraggableArea from '../../Components/DraggableArea/DraggableArea';
import { SocialMediaAttributes } from '../../Models/Api/socialMedia.model';
import useAxiosPrivate from '../../Services/Hooks/useAxiosPrivate';
import {
  AxiosErrorData,
  AxiosResponseTypedArray,
} from '../../Models/AxiosResponse';
import { useAlert } from '../../Services/Context/Alert/AlertProvider';
import Modal from '../../Components/Modal/Modal';
import fetchAxios from '../../Services/Api/fetchAxios';

function SocialMedia() {
  const [items, setItems] = useState<SocialMediaAttributes[] | []>([]);
  const [modal, setModal] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const { triggerAlert } = useAlert();
  const { isLoading, error } = useQuery<
    AxiosResponseTypedArray<SocialMediaAttributes>,
    AxiosErrorData
  >({
    queryKey: ['social-media'],
    queryFn: async () =>
      fetchAxios({ axios: axiosPrivate, method: 'get', url: 'social-media' }),
    onSuccess(response) {
      setItems(response?.data);
    },
  });

  const sortSocialMedia = useMutation(
    async (socialMediaItems: SocialMediaAttributes[]) =>
      fetchAxios({
        axios: axiosPrivate,
        method: 'put',
        url: 'social-media/sort',
        data: { socialMedia: socialMediaItems },
      }),
    { onSuccess: (response) => triggerAlert(response.message, 'success') }
  );
  const updateSocialMedia = useMutation(
    async ({ id, obj }: { id: string; obj: Partial<SocialMediaAttributes> }) =>
      fetchAxios({
        axios: axiosPrivate,
        method: 'put',
        url: `social-media/${id}`,
        data: obj,
      }),

    { onSuccess: (response) => triggerAlert(response.message, 'success') }
  );

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }
    const [availableItems, unavailableItems] = _.partition(
      items,
      (item) => item.available
    );
    const [removed] = availableItems.splice(source.index, 1);
    availableItems.splice(destination.index, 0, removed);
    const newItems = Array.from([...availableItems, ...unavailableItems]);
    const updatedMenuIndexArray = newItems.map((smItem, index) => {
      if (smItem.order === index) {
        return smItem;
      }
      const copyMenuItem = smItem;
      copyMenuItem.order = index;
      return copyMenuItem;
    });
    setItems(updatedMenuIndexArray);
    sortSocialMedia.mutate(updatedMenuIndexArray);
  };

  const smRemoveAdd = (id: string, avalible: 0 | 1) => {
    const item = items.find((v) => v.id === id);
    if (item) {
      item.available = avalible;
      updateSocialMedia.mutate({ id, obj: item });
    }
  };

  const deleteHandler = (id: string) => {
    smRemoveAdd(id, 0);
  };

  const openModal = () => {
    setModal(true);
  };

  const addHandler = (id: string) => {
    smRemoveAdd(id, 1);
  };

  return (
    <Container>
      <Modal open={modal} setOpen={setModal}>
        <Typography typography="h4" textAlign="center" paddingBottom={2}>
          Add Social Media
        </Typography>
        {items.filter((v) => !v.available).length === 0 && (
          <Typography typography="p" textAlign="center">
            You added all Social Media
          </Typography>
        )}
        {items
          .filter((v) => !v.available)
          .map((item) => (
            <Container
              key={item.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 1,
              }}
            >
              <Typography component="p" key={item.id} fontWeight="bold">
                {_.startCase(item.name)}
              </Typography>
              <Button
                variant="contained"
                color="success"
                onClick={() => addHandler(item.id)}
              >
                +
              </Button>
            </Container>
          ))}
      </Modal>
      <Button
        color="primary"
        variant="contained"
        onClick={openModal}
        sx={{
          margin: '0 0 1rem auto',
          display: 'block',
          textAlign: 'center',
        }}
      >
        Add Social Media
      </Button>
      <DraggableArea
        objectNames={{
          id: 'id',
          label: 'name',
        }}
        items={items.filter((v) => v.available)}
        onDragEnd={onDragEnd}
        configButtons={{
          edit: true,
          delete: true,
        }}
        isLoading={isLoading}
        error={error}
        textWhenEmptyArray="Call to admin to add :("
        deleteHandler={deleteHandler}
      />
    </Container>
  );
}

export default SocialMedia;
