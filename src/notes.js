import { getDB, saveDB, insertDB } from "./db.js";

export const newNote = async (note, tags) => {
  const newNote = {
    tags,
    id: Date.now(),
    content: note,
  };

  await insertDB(newNote);

  return newNote;
};

export const getAllNotes = async () => {
  const { notes } = await getDB();
  return notes;
};

export const findNotes = async (filter) => {
  const { notes } = await getDB();
  return notes.filter(({ content, tags }) => {
    const contentInclude = content.toLowerCase().includes(filter.toLowerCase());
    const tagsInclude = tags.some((tag) =>
      tag.toLowerCase().includes(filter.toLowerCase())
    );
    return contentInclude || tagsInclude;
  });
};

export const removeNote = async (id) => {
  const { notes } = await getDB();
  const match = notes.find((note) => note.id === id);

  // let index = notes.findIndex((note) => note.id === id);

  // if (index !== -1) {
  //   notes.splice(index, 1);
  //   await saveDB({ notes: notes });
  // }

  // return id;

  // scott's method is create a new notes array which exclude the one being deleted, and then replace the database with the new array. That's really resouce consuming. He doesn't want to mutate original
  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);

    await saveDB({ notes: newNotes });

    return id;
  }
  // else {
  //   await saveDB({ notes: notes });

  //   return id;
  // }
};

export const removeAllNotes = () => {
  return saveDB({ notes: [] });
  // const { notes } = await getDB();
  // notes.splice(0, notes.length);
  // return notes;
};
