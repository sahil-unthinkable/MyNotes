import noteDataSource from "./datasources/noteDataSource";
import { Note } from "./entities/note";

export const getNotes = async (): Promise<Note[]> => {
  const noteRepository = noteDataSource.dataSource.getRepository(Note);
  return noteRepository.find();
};

export const addNewNote = async (content: string): Promise<Note> => {
  const noteRepository = noteDataSource.dataSource.getRepository(Note);
  const note = new Note();
  note.content = content;

  const res = await noteRepository.save(note);
  console.log(res);
  return res;
};

export const editNote = async (
  id: number,
  content: string
): Promise<boolean> => {
  const noteRepository = noteDataSource.dataSource.getRepository(Note);
  const note = await noteRepository.findOneBy({ id });
  if (note) {
    note.content = content;
    try {
      await noteRepository.save(note);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    return false;
  }
};

export const deleteNote = async (id: number): Promise<boolean> => {
  const noteRepository = noteDataSource.dataSource.getRepository(Note);
  const note = await noteRepository.findOneBy({ id });
  if (note) {
    try {
      await noteRepository.remove(note);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  } else {
    return false;
  }
};
