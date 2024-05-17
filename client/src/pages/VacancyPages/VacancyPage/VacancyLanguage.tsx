import { useState } from 'react';
import { Card, HStack, Text, IconButton, Menu, MenuButton, MenuItem, MenuList, Box } from '@chakra-ui/react';
import { FiMoreHorizontal, FiEdit, FiTrash2 } from 'react-icons/fi';
import useRequestHandler from '~/hooks/use-request-handler';
import { useDeleteVacancyLanguageLevelMutation } from '~/store/api/vacancy-slice';
import VacancyLanguageUpdate from './VacancyLanguageUpdate';
import type { VacancyLanguageLevel, Vacancy } from '~/types/vacancy';
import { languageTranslation } from '~/components/VacancyResumeCard/helpers';

type IProps = {
  languageLevel: VacancyLanguageLevel;
};

const VacancyLanguage = ({ languageLevel }: IProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const [deleteLanguageLevel] = useDeleteVacancyLanguageLevelMutation();

  const { handler: deleteHandler } = useRequestHandler<Pick<Vacancy, 'id'> & Pick<VacancyLanguageLevel, 'language'>>({
    f: deleteLanguageLevel,
    successMsg: 'Мову успішно видалено.',
  });

  return (
    <Card p="2" w="100%" variant="outline">
      {isEdit ? (
        <VacancyLanguageUpdate languageLevel={languageLevel} setIsEdit={setIsEdit} />
      ) : (
        <HStack spacing="4">
          <Text w="30px">{languageLevel.level}</Text>
          <Text w="100%">{languageTranslation[languageLevel.language]}</Text>
          <Box>
            <Menu>
              <MenuButton as={IconButton} aria-label="Options" icon={<FiMoreHorizontal />} variant="ghost" h="30px" />
              <MenuList>
                <MenuItem icon={<FiEdit />} onClick={() => setIsEdit(true)}>
                  Редагувати
                </MenuItem>
                <MenuItem
                  color="red"
                  icon={<FiTrash2 />}
                  onClick={() => deleteHandler({ id: languageLevel.vacancyId, language: languageLevel.language })}
                >
                  Видалити
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      )}
    </Card>
  );
};

export default VacancyLanguage;
