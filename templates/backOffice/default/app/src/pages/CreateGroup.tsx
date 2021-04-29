import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setGroup, initialState as initialGroupState } from "../redux/group";
import { setBlocks, initialState as initialBlocksState } from "../redux/blocks";
import { setUnsaved } from "../redux/ui";
import Menu from "../components/Menu";
import Group from "../components/Group";
import { useCreateOrUpdateGroup } from "../hooks/data";
import { RootState } from "../redux/store";
import { Prompt } from "react-router-dom";

export default function CreateGroup() {
  const dispatch = useDispatch();
  const group = useSelector((state: RootState) => state.group);
  const blocks = useSelector((state: RootState) => state.blocks);
  const isUnsaved = useSelector((state: RootState) => state.ui.isUnsaved);
  const mutation = useCreateOrUpdateGroup();

  useEffect(() => {
    dispatch(setGroup(initialGroupState));
    dispatch(setBlocks(initialBlocksState));
    dispatch(setUnsaved(false));
  }, []);

  useEffect(() => {
    dispatch(setUnsaved(!!group.title || blocks.length > 0));
  }, [group, blocks]);

  const onSave = () => {
    mutation.mutate({ group, blocks });
  };

  return (
    <>
      <Prompt when={isUnsaved} message="Are you sure you want to leave?" />
      <Group onSave={onSave} />
      <Menu />
    </>
  );
}