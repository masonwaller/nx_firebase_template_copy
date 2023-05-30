import { findOne, getDataById, updateData } from '@nx-template/firebase';
import { checkIfExpired } from '../util';

interface AuthorizeUserRequest extends Express.Request {
  body: {
    accessToken: string;
  };
  user: { uid: string };
}

// When user enters access token into form on front end after signin/signup
export const oneTimeUserAuthorization = async (
  req: AuthorizeUserRequest,
  res
) => {
  try {
    const storedTokenDoc = await findOne({
      collection: 'accessTokens',
      field: 'token',
      matches: req.body.accessToken,
    });

    const isExpired = checkIfExpired(storedTokenDoc.expires);

    if (!isExpired) {
      const params = {
        active: true,
        group: storedTokenDoc.groupId,
        cohort: storedTokenDoc.cohortId,
      } as any;
      if (storedTokenDoc.roles) {
        params.roles = storedTokenDoc.roles;
      }
      if (storedTokenDoc.onboarding) {
        params.onboarding = storedTokenDoc.onboarding;
      }
      if (storedTokenDoc.course) {
        params.course = storedTokenDoc.course;
      }
      if (storedTokenDoc.support) {
        params.support = storedTokenDoc.support;
      }
      if (storedTokenDoc.courseHistory) {
        params.courseHistory = storedTokenDoc.courseHistory;
      }

      await updateData({
        collection: 'users',
        params: params,
        docId: req.user.uid,
      });

      return res
        .status(200)
        .json({ success: true, message: 'User is authorized.' });
    } else {
      return res
        .status(200)
        .json({ success: false, message: 'User is not authorized.' });
    }
  } catch (e) {
    console.error(
      'Error authorizeUser() for ' +
        req.user.uid +
        ' with token: ' +
        req.body.accessToken,
      e
    );
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error.' });
  }
};

// We need an open route to check on the front end whether the user is active/admin or not in the firebase auth listener.
export const checkIfUserIsAuthorized = async (req, res) => {
  try {
    const user = await getDataById({
      collection: 'users',
      docId: req.user.uid,
    });

    if (user.active) {
      return res
        .status(200)
        .send({ active: user.active, roles: user.roles, group: user.group });
    } else {
      return res
        .status(200)
        .send({ active: false, roles: user.roles, group: user.group });
    }
  } catch (e) {
    console.error(`Error checkIfUserActive() for user ${req.user.uid}`, e);
    return res.status(500).send('Internal Server Error.');
  }
};